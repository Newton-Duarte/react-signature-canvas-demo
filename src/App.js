import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./styles.css";

export default function App() {
  const [isDirty, setIsDirty] = useState(false);
  const [imageURL, setImageURL] = useState();
  const sigCanvas = useRef();

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
  };

  const download = () => {
    const dlink = document.createElement("a");
    dlink.setAttribute("href", imageURL);
    dlink.setAttribute("download", "signature.png");
    dlink.click();
  };

  const handleBegin = () => {
    if (isDirty) return;

    setIsDirty(true);
    console.log('begin');
  };

  const handleClear = () => {
    sigCanvas.current.clear();
    setImageURL();
    setIsDirty(false);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ className: "sigCanvas" }}
        onBegin={handleBegin}
      />
      <div>
        {isDirty && <button onClick={create}>Save</button>}
        <button onClick={handleClear}>Clear</button>
        {isDirty && <button onClick={download}>Download</button>}
      </div>

      {imageURL && (
        <>
          <h1>Image saved</h1>
          <img src={imageURL} alt="signature" className="signature" />
        </>
      )}
    </div>
  );
}
