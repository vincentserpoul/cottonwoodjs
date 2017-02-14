# Interfacing with cottonwood RFID usb device

USB port Long Range UHF RFID reader (ISO18000-6C EPC G2) 

* WIP *

## Preface

After spending many weekends to test and find a way to interact with this hardware with golang and failed, I decided to try out to implement it in js!

## Prerequisite (linux)

Add an udev rule in order to be able to interact with the device without having permission issues.

create /etc/udev/rules.d/50-cottonwood-uhf-reader.rules

```
# Cottonwood UHF reader
SUBSYSTEM=="usb", ATTRS{idVendor}=="1325", ATTRS{idProduct}=="c029", MODE="0660", GROUP="plugdev", SYMLINK+="cottonwood"
SUBSYSTEM=="hidraw*", ATTRS{idVendor}=="1325", ATTRS{idProduct}=="c029", MODE="0660", GROUP="plugdev", SYMLINK+="cottonwood"
```