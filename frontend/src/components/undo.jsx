export default function Undo({ onClick }) {
  return (
    <button className="swipe-btn undo" onClick={onClick} style={{ backgroundColor: '#f5d4a1ff', borderRadius: '50%', width: '60px', height: '60px', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
      🔙
    </button>
  );
}