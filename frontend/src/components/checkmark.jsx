export default function Checkmark({ onClick }) {
  return (
    <button className="swipe-btn check" onClick={onClick} style={{ backgroundColor: '#e06fc0ff', borderRadius: '50%', width: '60px', height: '60px', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>
      ❤️
    </button>
  );
}