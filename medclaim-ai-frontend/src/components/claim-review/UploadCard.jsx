export default function UploadCard({ files }) {

    return (

        <div
            style={{
                marginTop: 20,
                textAlign: "center",
            }}
        >

            <button
                disabled={files.length === 0}
                style={{
                    opacity: files.length === 0 ? 0.5 : 1,
                    cursor:
                        files.length === 0
                            ? "not-allowed"
                            : "pointer",
                }}
            >
                Analyze Claim
            </button>

        </div>

    );

}