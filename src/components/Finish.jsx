export default function Finish({ status, battery, currentIndex, totalQuestions, onRestart }) {
  // 初心者の仕事：ここにゲーム終了後の好きなデザインを書く
  const isWon = status === 'won';
  
  return (
    <div style={{ textAlign: "center", padding: "40px", backgroundColor: "red"}}>
      <h2>{isWon ? "🎉 全問正解！おめでとうございます！" : "💥 ゲームオーバー"}</h2>
      
      <p>回答した問題数: {currentIndex} / {totalQuestions}</p>
      <p>バッテリー残量: {battery}%</p>
      
      <button 
        onClick={onRestart} 
        style={{ 
          padding: "10px 20px", 
          fontSize: "16px", 
          cursor: "pointer" 
        }}
      >
        もう一度プレイする
      </button>
    </div>
  );
}