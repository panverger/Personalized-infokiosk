
"""
Sample script that monitors smartcard insertion/removal.
__author__ = "http://www.gemalto.com"
This file is part of pyscard.
"""

from time import sleep
import serial
arduino = serial.Serial('COM3', 9600, timeout=.1)

import time


from smartcard.CardMonitoring import CardMonitor, CardObserver
from smartcard.util import toHexString
from smartcard.scard import *

import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

hresult, hcontext = SCardEstablishContext(SCARD_SCOPE_USER)

assert hresult==SCARD_S_SUCCESS

hresult, readers = SCardListReaders(hcontext, [])

assert len(readers)>0

reader = readers[0]

#control card #1
cardCtrl1 = [61, 213, 8, 64, 144, 0]

#global vars
server_ip = "194.63.218.8"
client_id = "test_client"


# a simple card observer that prints inserted/removed cards
class PrintObserver(CardObserver):
    """A simple card observer that is notified
    when cards are inserted/removed from the system and
    prints the list of cards
    """

    def update(self, observable, actions):
        (addedcards, removedcards) = actions
        for card in addedcards:
            print("+Inserted: ", toHexString(card.atr))
            read()
        for card in removedcards:
            print("-Removed: ", toHexString(card.atr))


def read():
    global server_ip
    try:
        hresult, hcard, dwActiveProtocol = SCardConnect(
            hcontext,
            reader,
            SCARD_SHARE_SHARED,
            SCARD_PROTOCOL_T0 | SCARD_PROTOCOL_T1)
        hresult, response = SCardTransmit(hcard,dwActiveProtocol,[0xFF,0xCA,0x00,0x00,0x00])
        print("ID:",toHexString(response))
        if compare(response,cardCtrl1):
            if server_ip == "194.63.218.8":
                server_ip = "10.12.21.10"
            else:
                server_ip = "194.63.218.8"
            print("Switch server",server_ip)
        else:
            send(toHexString(response))
  
    except:
        print("Can't read")

def compare(l1,l2):
    k=0
    res=1   
    for i in l1:
        res *= (l1[k]==l2[k])
        k+=1
    return bool(res)

def send(payloadText):
    # Assign Server/Client/Payload details
    # server_ip = "test.mosquitto.org"
    print("Try to send ...")
    topic = "/pps/cardID"
    try:
        publish.single(topic, payload=payloadText, qos=0, retain=False, hostname=server_ip, port=1883, client_id="", keepalive=60, will=None, auth=None, tls=None, protocol=mqtt.MQTTv311, transport="tcp")
    except:
        print("Can't send")    


if __name__ == '__main__':
    print("Insert or remove a smartcard in the system.")
    #print("This program will exit in 10 seconds")
    print("")
    cardmonitor = CardMonitor()
    cardobserver = PrintObserver()
    cardmonitor.addObserver(cardobserver)
    
    while True:
        try:
            topic = "/pps/button"
            data = arduino.readline().decode().strip('\r\n')  #[:-2] #the last bit gets rid of the new-line chars
            if data:
                print("-")
                print (data)
            if data == "The sensor A is touched":
                print ("left")
                publish.single(topic, payload="left", qos=0, retain=False, hostname=server_ip, port=1883, client_id="", keepalive=60, will=None, auth=None, tls=None, protocol=mqtt.MQTTv311, transport="tcp")
            if data == "The sensor B is touched":
                print ("right")
                publish.single(topic, payload="right", qos=0, retain=False, hostname=server_ip, port=1883, client_id="", keepalive=60, will=None, auth=None, tls=None, protocol=mqtt.MQTTv311, transport="tcp")
            if data == "The sensor C is touched":
                print ("select")  
                publish.single(topic, payload="select", qos=0, retain=False, hostname=server_ip, port=1883, client_id="", keepalive=60, will=None, auth=None, tls=None, protocol=mqtt.MQTTv311, transport="tcp")

            sleep(0.2)
        except:
            pass

    # don't forget to remove observer, or the
    # monitor will poll forever...
    cardmonitor.deleteObserver(cardobserver)

    import sys
    if 'win32' == sys.platform:
        print('press Enter to continue')
        sys.stdin.read(1)
