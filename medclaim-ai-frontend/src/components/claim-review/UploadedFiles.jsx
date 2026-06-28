import { FileText, X } from "lucide-react";
import "./UploadedFiles.css";

export default function UploadedFiles({ files, setFiles, disabled }) {
  const removeFile = (index) => {
    if (disabled) return;
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  if (files.length === 0) return null;

  return (
    <div className="uploaded-files-card">
      <div className="uploaded-header">
        <h2>Uploaded Documents</h2>
        <span className="uploaded-count">{files.length} / 4</span>
      </div>

      <div className="uploaded-list">
        {files.map((file, index) => (
          <div key={index} className="uploaded-item">
            <div className="file-info">
              <div className="file-icon-wrap">
                <FileText size={18} />
              </div>
              <div>
                <h4>{file.name}</h4>
                <span>{formatSize(file.size)}</span>
              </div>
            </div>

            {!disabled && (
              <button
                className="remove-btn"
                onClick={() => removeFile(index)}
                title="Remove file"
              >
                <X size={15} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}