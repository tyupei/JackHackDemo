import { useState } from 'react'
import BatteryMeter from './components/BatteryMeter'
import QuizBoard from './components/QuizBoard'
import HintSystem from './components/HintSystem'
import Finish from './components/Finish'
import './App.css'

// クイズの問題とヒントのデータ
const QUESTIONS = [
  { id: 1, text: "o-mu", choices: ["Ω", "V"], answer: "Ω", hint: "ギリシャ文字です" },
  { id: 2, text: "useState", choices: ["useState", "useEffect"], answer: "useState", hint: "名前の通りです" },
];

function App() {
  const [battery, setBattery] = useState(100); // バッテリー残量
  const [currentIndex, setCurrentIndex] = useState(0); // 現在の問題番号
  const [isHintVisible, setIsHintVisible] = useState(false); // ヒント表示フラグ
const [status, setStatus] = useState('playing');//ゲームステータス: 'playing' | 'won' | 'lost'

  const handleAnswer = (choice) => {
    const isCorrect = choice === QUESTIONS[currentIndex].answer;
    
    if (!isCorrect) {
      setStatus('lost');
      return;  //不正解でゲーム終了
      
    }
    
    if (currentIndex < QUESTIONS.length - 1 && isCorrect) {
      setCurrentIndex(prev => prev + 1);
      setIsHintVisible(false); // 次の問題ではヒントを隠す
    } else {
      setStatus('won'); //最後の問題に正解したらゲーム終了
    }
  };

  // --- 関数：ヒント消費ロジック ---
  const useHint = () => {
    if (battery >= 10) {
      setBattery(prev => prev - 10); // 10消費
      setIsHintVisible(true);
    }
  };

  // 関数：ゲーム再スタート
  const handleRestart = () => {
    setBattery(100);
    setCurrentIndex(0);
    setIsHintVisible(false);
    setStatus('playing');
  };

  return (
    <div style={{ padding: "20px" }}>
      
      {/* ゲーム終了画面 */}
      {status !== 'playing' && (
        <Finish 
          status={status}
          battery={battery} 
          currentIndex={currentIndex + 1} 
          totalQuestions={QUESTIONS.length}
          onRestart={handleRestart}
        />
      )}

      {/* ゲーム進行中 */}
      {status === 'playing' && (
        <>
          {/* バッテリーメーター（残量を渡すだけ） */}
          <BatteryMeter battery={battery} />

          {/* クイズボード（問題データと、答えた時の動きを渡す） */}
          <QuizBoard 
            data={QUESTIONS[currentIndex]} 
            onAnswer={handleAnswer} 
          />

          {/* ヒントシステム（残量と、ボタンを押した時の動きを渡す） */}
          <HintSystem 
            battery={battery} 
            onUseHint={useHint} 
            isHintVisible={isHintVisible} 
            hintText={QUESTIONS[currentIndex].hint} 
          />
        </>
      )}
    </div>
  )
}


export default App
