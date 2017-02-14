const HID = require('node-hid');

const VENDOR_ID = 0x1325;
const PRODUCT_ID = 0xc029;

const devicesFound = HID.devices(VENDOR_ID, PRODUCT_ID);

if (devicesFound.length === 0) {
  console.log('no device found');
  process.exit(0);
}

const hidDevice = new HID.HID(VENDOR_ID, PRODUCT_ID);

// sendCommand
const sendCommand = (reportId, data) => {
  const featReport = new Uint8Array([reportId, data.length + 2, ...data]);
  hidDevice.sendFeatureReport(featReport);
};

const readResponse = (callback) => {
  setTimeout(
    () => { callback.apply(null, [hidDevice.getFeatureReport(0x10, 0x64)]); },
    100
  );
};

const getHardwareVersion = () => {
  sendCommand(0x10, new Uint8Array(0x00));
  readResponse((response) => {
    let strResp = '';
    response.forEach((element, i) => {
      if (i > 0) {
        strResp += String.fromCharCode(element);
      } else {
        console.log(element);
      }
    });
    console.log(strResp);
  });
};

getHardwareVersion();
