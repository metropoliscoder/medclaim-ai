import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";
import "./UploadZone.css";

const SUPPORTED = [
  { label: "Claim Form" },
  { label: "Hospital Bill" },
  { label: "Insurance Policy" },
  { label: "Discharge Summary" },
];

export default function UploadZone({ files, setFiles, disabled }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (disabled) return;
      const updatedFiles = [...files, ...acceptedFiles].slice(0, 4);
      setFiles(updatedFiles);
    },
    [files, setFiles, disabled]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 4,
    noClick: true,
    disabled,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <div
      {...getRootProps()}
      className={`upload-zone ${isDragActive ? "drag-active" : ""} ${
        disabled ? "upload-zone--disabled" : ""
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud className="upload-icon" size={56} />

      <h2>Upload Healthcare Documents</h2>

      <p className="upload-description">
        Drag & drop your healthcare PDFs here, or browse below
      </p>

      <button
        type="button"
        className="browse-btn"
        onClick={open}
        disabled={disabled}
      >
        Browse Files
      </button>

      <div className="supported-files">
        {SUPPORTED.map((s) => (
          <div key={s.label}>
            <FileText size={14} />
            {s.label}
          </div>
        ))}
      </div>

      <span className="upload-note">
        PDF only &bull; Maximum 4 files &bull; Max 10 MB each
      </span>

      {files.length > 0 && (
        <div className="upload-count">
          {files.length} / 4 document{files.length !== 1 ? "s" : ""} ready
        </div>
      )}
    </div>
  );
}