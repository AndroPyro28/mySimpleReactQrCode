import React, { useState } from 'react';
import './App.css';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';

function App() {
  const [text, setText] = useState(String)
  const [urlImgResult, setUrlImgResult] = useState(null);

  const [resultWebCam, setResultWebCam] = useState();
  const generateQr = async () => {
    const result = await QRCode.toDataURL(text, {width: 300}); // generate a qr code with a prefered text and width of 300px
    setUrlImgResult(result); // store the result
  }

  const handleScanWebCam = (data) => {
    if(data) {
      setResultWebCam(data); //handling the scanned file on scanner
    }
  }
  const handleError = (error) => {
    console.error(error) //handling the error on scanner
  }
  return (
    <div className="App">
      <section className="qr__generator">
        <h1>Scan & Generate Qr Code</h1>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="generate a qr code" />
        <button onClick={generateQr}>Generate</button>
        {
          urlImgResult && <React.Fragment>
            
            <a href={urlImgResult} download><img src={urlImgResult} alt="img"/></a>
            <p>click this image to download</p>
          </React.Fragment>
        }

      </section>
      <section className="qr__scanner">
        <QrReader
        delay={100}
        onScan = {handleScanWebCam}
        onError={handleError}
        />
        result by webcam: {resultWebCam}
      </section>
    </div>
  );
}

export default App;
