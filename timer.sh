while true
do
    bandwidth=$((1 + RANDOM % 100))
    eval mosquitto_pub -t bandwidth -m $bandwidth
    echo "Bandwidth $bandwidth"

    temp=$((40 + RANDOM % 130))
    eval mosquitto_pub -t temp -m $temp
    echo "Temp $temp"

    sleep $((1 + RANDOM % 3))

    tempAmbient=$((-18 + RANDOM % 40))
    eval mosquitto_pub -t tempAmbient -m $tempAmbient
    echo "tempAmbient $tempAmbient"

    error=$((-18 + RANDOM % 40))
    eval mosquitto_pub -t error -m $error
    echo "error $error"
    sleep $((1 + RANDOM % 3))
done
