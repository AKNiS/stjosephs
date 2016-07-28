<?php

// goal: use one processor to handle 3 forms
// - newsletter form
// - contact form
// - carer apply form

// newsletter 
// is a data subset of contact
// is a data subset of foster-care

// so it should be doable


// should be able to send action functions (email, db) an array of data and have it handle that

// pseudocode:
// ----
// get form type
// save POST vals as php vars
// validate for form type
// 	return if invalid
// label & package data for sending around

// fn submitNewsletter(array)
// fn submitEmail(array)
// fn submitDb(array)
if ($_SERVER["REQUEST_METHOD"] != "POST") {
	die("Please submit the form");
}

include_once('config.php');

$formName = test_input($_POST['formName']);
if($formName == 'newsletter-form') {
	$email = test_input($_POST['email']); 
	$mailingList = true;
	$notSpam = $_POST['b_da9a0881ddc88eea35d96f896_1084d3a4fe'];
	
	// Data for mailchimp
	$merge_fields = array('SOURCE' => 'Newsletter Form');

	// Data for email
	$subject = "[Website] Newsletter Form Submission";
	$email_fields = array('Source' => 'Newsletter Form',
						'Email' => $email);
} else if($formName == 'contact-form') {
	echo "setting contact form data";
    $email = test_input($_POST['email']); 
	$firstName = test_input($_POST['firstName']);
	$lastName = test_input($_POST['lastName']);
	$telephone = test_input($_POST['telephone']);
	$message = test_input($_POST['message']);
	$dept = test_input($_POST['dept']);
	$mailingList = (isset($_POST['mailingList']) ? true : false);
	$notSpam = $_POST['b_da9a0881ddc88eea35d96f896_1084d3a4fe']; // should be blank (bots would fill in with random text)

	// Data for mailchimp
	$merge_fields = array('SOURCE' => 'Contact Form',
						'FNAME' => $firstName,
						'LNAME' => $lastName,
						'DEPT' => $dept);
	// Data for email
	$subject = "[Website] Contact Form Submission";
	$email_fields = array('Source' => 'Contact Form',
						'Name' => $firstName . " ". $lastName,
						'Email' => $email,
						'Telephone' => $telephone,
						'Message' => $message,
						'Requested Department' => $dept);
} else if($formName == 'foster-care-form') {
	print "setting foster care form data";
    $email = test_input($_POST['email']); 
	$firstName = test_input($_POST['firstName']);
	$lastName = test_input($_POST['lastName']);
	$telephone = test_input($_POST['telephone']);
	$dob = test_input($_POST['dob']);
	$address = test_input($_POST['address']);
	$town = test_input($_POST['town']);
	$postCode = test_input($_POST['postCode']);
	$message = test_input($_POST['message']);
	$dept = test_input($_POST['dept']);
	$mailingList = (isset($_POST['mailingList']) ? true : false);
	$notSpam = $_POST['b_da9a0881ddc88eea35d96f896_1084d3a4fe']; // should be blank (bots would fill in with random text)

	// Data for mailchimp
	$merge_fields = array('SOURCE' => 'Foster Care Form',
						'FNAME' => $firstName,
						'LNAME' => $lastName,
						'DEPT' => $dept);
	// Data for email
	$subject = "[Website] Foster Carer Application";
	$email_fields = array('Source' => 'Foster Carer Application Form',
						'Name' => $firstName . " ". $lastName,
						'Email' => $email,
						'Telephone' => $telephone,
						'Date of Birth' => $dob,
						'Address' => $address,
						'Suburb/Town' => $town,
						'Post Code' => $postCode,
						'Requested Department' => $dept);
}

// 1. first submit newsletter info
// if($mailingList && $notSpam == '') {
// 	echo "Sending to mailchimp";
// 	mailchimpSubmit($email, $merge_fields);
// } else {
// 	echo "Not sending to mailchimp";
// }

// 2. then send the data via email
// emailSubmit($email, $subject, $email_fields);

// 3. then store the data in the database
dbSubmit($formName, $firstName, $lastName, $email, $telephone, $dept, $message, $mailingList);

// redirect to a thank you page




function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = strip_tags($data);
	$data = htmlspecialchars($data);
	return $data;
}

function mailchimpSubmit($email, $merge_fields) {
	// print "Sending info to mailchimp<br />";

	// vars
	$mc_api_root = MC_API_ROOT;
	$mc_api_key = MC_API_KEY;
	$mc_list_endpoint = MC_LIST_ENDPOINT; // for subscribing to SJC list

	// check mailchimp to see if user exists
	$curl_connection = curl_init($mc_api_root . $mc_list_endpoint . md5(strtolower($email)));
	curl_setopt($curl_connection, CURLOPT_HTTPHEADER, 
				array('Authorization: apikey '.$mc_api_key));
	curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
	// echo "initial user check result:";
	$result = curl_exec($curl_connection);
	curl_close($curl_connection);
	$status = json_decode($result, true)['status'];
	// echo $status;


	// if the user already exists, update the old record
	if($status == 'subscribed') {
		$curl_connection = curl_init($mc_api_root . $mc_list_endpoint . md5(strtolower($email)));
		curl_setopt($curl_connection, CURLOPT_CUSTOMREQUEST, 'PUT');
	} else {
		$curl_connection = curl_init($mc_api_root . $mc_list_endpoint);	
	}
	// set data to be sent
	$post_items = array('email_address' => $email,
						'status' => 'subscribed',
						'status_if_new' => 'subscribed',
						'update_existing' => true
						);
	if(!empty($merge_fields)) {
		$post_items['merge_fields'] = $merge_fields;
	}
	$payload = json_encode( $post_items );
	// set options
	curl_setopt($curl_connection, CURLOPT_POSTFIELDS, $payload );
	curl_setopt($curl_connection, CURLOPT_HTTPHEADER, 
				array('Content-Type:application/json',
						'Authorization: apikey '.$mc_api_key));
	curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);

	// perform our request
	// echo "user post/patch result";
	$result = curl_exec($curl_connection);
	//close the connection
	curl_close($curl_connection);

	// show information regarding the request
	// echo "<pre>$result</pre>";
	// echo json_decode($result, true)['status'];
	// print "<pre>";
	// print_r(curl_getinfo($curl_connection));
	// print "</pre>";
	// echo curl_errno($curl_connection) . '-' . 
	// curl_error($curl_connection);

}

function emailSubmit($email, $subject, $email_fields) {
	// print "Sending info to email<br />";
    // PREPARE THE BODY OF THE MESSAGE

	$message = '<html><body>';
	$message .= '<table rules="all" style="border-collapse:collapse;color:#000000;" cellpadding="10">';
	$message .= '<tr style="border-bottom: 3px solid #EA634F"><td align="middle" colspan="2"><img src="http://joshgordonmusic.com/images/logo.png" width="114" height="58" alt="St Joseph\'s Cowper" /></td></tr>';
	foreach ($email_fields as $key => $value) {
		$message .= "<tr style='background: #ffffff;'><td border='0' style='border:none;'><strong>" . $key . "</strong> </td><td border='0' style='border:none;'>" . $value . "</td></tr>";
	}
	$message .= "</table>";
	$message .= "</body></html>";
    echo $message;
    //   CHANGE THE BELOW VARIABLES TO YOUR NEEDS
     
	$to = EMAIL_RECEIVER;
	
	$headers = "From: " . $email . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    if (mail($to, $subject, $message, $headers)) {
      echo 'Your message has been sent.';
    } else {
      echo 'There was a problem sending the email.';
    }
}

function dbSubmit($formName, $firstName, $lastName, $email, $telephone, $dept, $content, $mailingList) {
	$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_DB);

	// if($db->connect_errno > 0){
	//     die('Unable to connect to database [' . $db->connect_error . ']');
	// }
	// echo 'Connection OK'; $db->close();
	$formName_clean = $db->escape_string($formName); 
	$firstName_clean = $db->escape_string($firstName);
	$lastName_clean = $db->escape_string($lastName);
	$email_clean = $db->escape_string($email);
	$telephone_clean = $db->escape_string($telephone);
	$dept_clean = $db->escape_string($dept);
	$content_clean = $db->escape_string($content);
	$mailingList_clean = $db->escape_string($mailingList);

	$sql = <<<SQL
			INSERT INTO `submissions` (`formName`, `firstName`, `lastName`, `email`, `telephone`, `dept`, `message`, `mailingList`)
			VALUES ('$formName', '$firstName_clean', '$lastName_clean', '$email_clean', '$telephone_clean', '$dept_clean', '$content_clean', '$mailingList_clean');
SQL;

// 	$sql = <<<SQL
// 	    SELECT *
// 	    FROM `submissions`
// SQL;

	if(!$result = $db->query($sql)){
	    die('There was an error running the query [' . $db->error . ']');
	} else {
		echo 'Record added to database';
	}
	$db->close();
	// echo "<table>";
	// while($row = $result->fetch_assoc()){
	// 	echo "<tr>";
	//     echo "<td border='0' style='border:none;'>".$row['email']."</td>";
	//     echo "<td border='0' style='border:none;'>".$row['telephone']."</td>";
	//     echo "</tr>";
	// }
	// echo "</table>";
}