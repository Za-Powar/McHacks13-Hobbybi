export default function Cross({ onClick }) {
  return (
    <button className="swipe-btn cross" onClick={onClick} style={{ backgroundColor: '#7f9de7ff', borderRadius: '50%', width: '60px', height: '60px', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
      ❌
    </button>
  );
}