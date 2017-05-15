<?php
    global $basePath,$baseUrl,$baseDB,$baseUS,$basePW;
    session_start();

	// Globales.
	$basePath = str_replace('/conf','',dirname(__FILE__));
	$baseUrl  = 'http://localhost:8080';
    $baseDB   =  'mysql:host=localhost;dbname=tvm;';
    $baseUS   = 'test';
    $basePW   = 'test';
    
    // Requerimientos.
	$FILES = scandir($basePath.'/plib');
	unset($FILES[0]);
	unset($FILES[1]);

	require_once $basePath.'/plib/class.main.php';
	foreach ($FILES as $file) {
		require_once $basePath.'/plib/'.$file;
    }