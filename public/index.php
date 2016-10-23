<?php

    session_start();

    if($_SERVER["REQUEST_METHOD"]=="POST"){

            // The data to send to the API

            $freelancer=real_escape_string($_POST['freelancer']);

            $postData = array(
                'url' => $freelancer
            );

            // Create the context for the request
            $context = stream_context_create(array(
                'http' => array(
                  
                    'method' => 'POST',     
                    'content' => json_encode($postData)
                )
            ));

            // Send the request
            $response = file_get_contents('localhost:8000/freelancer/posts/',$context);

            // Check for errors
            if($response === FALSE){
                die('API replyed nothing');
            }

            // Decode the response
            $responseData = json_decode($response, TRUE);


            $_SESSION['freelancer_name']=$responseData['name'];
            $_SESSION['freelancer_rating']=$responseData['rating'];
            $_SESSION['freelancer_rate']=$responseData['rate'];

            $_SESSION['freelancer_location']=$responseData['location'];






            header("location: profile.php");

            

    }


?>



<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Creative - Start Bootstrap Theme</title>

    <!-- Bootstrap Core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>

    <!-- Plugin CSS -->
    <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet">

    <!-- Theme CSS -->
    <link href="css/style.css" rel="stylesheet">


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-top">

    <nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand page-scroll" href="#page-top">Profile Mash</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="page-scroll" href="#about">Links</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#services">About</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>

    <header>
        <div class="header-content">
            <div class="header-content-inner">
                <h1 id="homeHeading">All your freelance profiles collected at one place.</h1>
                <hr>
                <p>Profile Mash allows you to fetch information from your various freelance network profiles and presents it all in an organized manner.</p>
                <a href="#about" class="btn btn-primary btn-xl page-scroll">Get Started!</a>
            </div>
        </div>
    </header>

    <section class="bg-primary" id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                <div class="mashingup">
                    <h2 class="section-heading">Enter your profile links here</h2>
                    <hr class="light">
                    <div class="websites">
                    <p class="text-faded">
                       <form class="form" method="POST" action="#">
                            <label for="freelancer">FreeLancer</label><br>
                                <input type="text" id="freelancer" name="freelancer"><br>
                            <label for="site 2">Site 2</label><br>
                                <input type="text" id="site 2" name="site 2"><br>
                            <label for="site 3">Site 3</label><br>
                                <input type="text" id="site 3" name="site 3"><br>
                            <label for="site 4">Site 4</label><br>
                                <input type="text" id="site 4" name="site 4">
                                   <center><button type="submit" class="page-scroll btn btn-default btn-xl sr-button">Mash It Up!</button></center>
                          </form>
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section id="services">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">About</h2>
                    <hr class="primary">
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="service-box">
                        <div class="circular1">
                             <img src="img/1.jpg" width="140px" height="140px"/>
                        </div>
                        <h3>Dhruv Rawat</h3>
                        <p class="text-muted">Our Backend Developer.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="service-box">
                        <div class="circular1">
                             <img src="img/2.jpg" width="140px" height="140px"/>
                        </div> 
                        <h3>Ayush Singh</h3>
                        <p class="text-muted">Our Web Designer</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="service-box">
                         <div class="circular1">
                             <img src="img/3.jpg" width="140px" height="140px"/>
                        </div>
                        <h3>Karan Agarwak</h3>
                        <p class="text-muted">Our Backend Developer</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="service-box">
                         <div class="circular1">
                             <img src="img/4.jpg" width="120px" height="120px"/>
                        </div>
                        <h3>Umang Govil</h3>
                        <p class="text-muted">Our Front-end Developer</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

        <section id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="section-heading">Let's Get In Touch!</h2>
                    <hr class="primary">
                    <p>Ready to build your next web application with us? That's great! Give us a call or send us an email and we will get back to you as soon as possible!</p>
                </div>
                <div class="col-lg-4 col-lg-offset-2 text-center">
                    <i class="fa fa-phone fa-3x sr-contact"></i>
                    <p>9509787709</p>
                </div>
                <div class="col-lg-4 text-center">
                    <i class="fa fa-envelope-o fa-3x sr-contact"></i>
                    <p><a href="mailto:your-email@your-domain.com">photo_mash@gmail.com</a></p>
                </div>
            </div>
        </div>
    </section>

    <!-- jQuery -->
    <script src="vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="vendor/scrollreveal/scrollreveal.min.js"></script>
    <script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>

    <!-- Theme JavaScript -->
    <script src="js/creative.min.js"></script>

</body>

</html>
