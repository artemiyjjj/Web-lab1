<?php
header("Access-Control-Allow-Origin: *");
$script_start = microtime(true);

if (isset($_POST["r"]) && isset($_POST["x"]) && isset($_POST["y"])) {
    $x = $_POST["x"];
    $y = $_POST["y"];
    $r = $_POST["r"];

    $r = correctZero($r);
    $y = correctZero($y);
    $x = correctZero($x);

    if (getFloatLength($x) < 8 && getFloatLength($y) < 8 && getFloatLength($r) < 8) {
        $x = (float)$x;
        $y = (float)$y;
        $r = (float)$r;

        if (gettype($x) == "double" && gettype($y) == "double" && gettype($r) == "double") {
            if ($x >= -5 && $x <= 3 && $y >= -5 && $y <= 3 && $r >= 1 && $r <= 4) {
                $isHit = hit($x, $y, $r) ? "hit" : "miss";
                $currentTime = gmDate("H:i:s", time() + 3600 * (3 + date("I")));
                $execution_time = ceil((microtime(true) - $script_start) * 100000000) / 100;
                echo "
                <tr>
                <td>X: $x; Y: $y; R: $r</td>
                <td>$isHit</td>
                <td>$currentTime</td>
                <td>$execution_time ms</td>
                </tr>
                ";
            } else {
                http_response_code(400);
                echo "Values are out of valid range.";
                exit(400);
            }
        } else {
            http_response_code(400);
            echo "Incorrect data.";
            exit(400);
        }
    } else {
        http_response_code(400);
        echo "Too much digits for float number. Possibility of overflow.";
        exit(400);
    }
} else {
    http_response_code(400);
    echo "Not complete request";
    exit(400);
}

function hit($x, $y, $r)
{
    if ($x == 0 && $y <= $r / 2 && $y >= -$r / 2) {
        return true;
    } elseif ($y == 0 && $x <= $r / 2 && $x >= -$r) {
        return true;
    } elseif ($x > 0 && $y > 0 && $x <= $r / 2 && $y <= $r / 2) {
        $yMax = sqrt((($r / 2) ** 2) - $x ** 2);
        if ($y <= $yMax) {
            return true;
        }
    } elseif ($x > 0 && $y < 0 && $x <= $r / 2 && $y >= -$r / 2) {
        $xPoints = [$x, 0, $r / 2, 0];
        $yPoints = [$y, 0, 0, -$r / 2];
        $cond1 = (($xPoints[1] - $xPoints[0]) * ($yPoints[2] - $yPoints[1])) - (($xPoints[2] - $xPoints[1]) * ($yPoints[1] - $yPoints[0]));
        $cond2 = (($xPoints[2] - $xPoints[0]) * ($yPoints[3] - $yPoints[2])) - (($xPoints[3] - $xPoints[2]) * ($yPoints[2] - $yPoints[0]));
        $cond3 = (($xPoints[3] - $xPoints[0]) * ($yPoints[1] - $yPoints[3])) - (($xPoints[1] - $xPoints[3]) * ($yPoints[3] - $yPoints[0]));
        if (($cond1 >= 0 && $cond2 >= 0 && $cond3 >= 0) || ($cond1 <= 0 && $cond2 <= 0 && $cond3 <= 0)) {
            return true;
        }
    } elseif ($x < 0 && $y < 0 && $x >= -$r && $y >= -$r / 2) {
        return true;
    } else {
        return false;
    }
}

function getFloatLength($num): int
{
    $array = explode(".", (string)$num);
    return array_key_exists(1, $array) ? strlen($array[1]) : 0;

}

function correctZero($num) {
	if ($num == "-0") {
		$num = 0;
	}
	return $num;
}

