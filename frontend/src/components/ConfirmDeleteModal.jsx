import "./ConfirmDeleteModal.css";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  projectTitle,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-icon-wrapper">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
          <h2>Delete Project?</h2>
        </div>

        <p className="modal-body-text">
          Are you sure you want to delete <strong>"{projectTitle}"</strong>?
          This action cannot be undone.
        </p>

        {/* الأزرار */}
        <div className="modal-actions">
          <button className="modal-keep-btn" onClick={onClose}>
            Keep Project
          </button>
          <button className="modal-delete-btn" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
