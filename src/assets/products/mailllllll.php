<?php
// Database credentials
$host = "localhost";
$db = "aquilainnovation_db";
$user = "aquilainnovation_aquilainnovation";
$pass = "A@quilaPassword";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Capture POST data
$name = $_POST['name'];
$college = $_POST['college'];
$year = $_POST['year'];
$father_name = $_POST['father_name'];
$mother_name = $_POST['mother_name'];
$father_occupation = $_POST['father_occupation'];
$mother_occupation = $_POST['mother_occupation'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$aadhar = $_POST['aadhar'];

// Insert into DB
$sql = "INSERT INTO trainee_details (name, college, year, father_name, mother_name, father_occupation, mother_occupation, phone, email, aadhar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssssss", $name, $college, $year, $father_name, $mother_name, $father_occupation, $mother_occupation, $phone, $email, $aadhar);

if ($stmt->execute()) {
    // Send confirmation email
    $to = "tbkprashant@gmail.com"; // Change this to your destination email
    $subject = "New Trainee Form Submitted";
    $message = "New form submitted:\n\nName: $name\nEmail: $email\nPhone: $phone\nCollege: $college\nYear: $year\nAadhar: $aadhar";
    $headers = "From: no-reply@aquilainnovations.in";

    mail($to, $subject, $message, $headers);

    // Show alert and redirect using JavaScript
    echo "<script>
        alert('Form submitted successfully!');
        window.location.href = 'https://aquilainnovations.in/careers.html';
    </script>";
} else {
    echo "<script>
        alert('Error: " . addslashes($stmt->error) . "');
        window.history.back();
    </script>";
}

$conn->close();
?>
