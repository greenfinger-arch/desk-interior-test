import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { allTests } from './data';

const App = () => {
  const [testKey, setTestKey] = useState('deskterior');
  const [step, setStep] = useState('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  // 배경음악을 위한 Ref
  const audioRef = useRef(null);

  useEffect(() => {
    // 1. URL 파라미터 확인
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id && allTests[id]) {
      setTestKey(id);
    }

    // 2. 오디오 객체 사전 생성 (재생은 클릭 후 가능)
    audioRef.current = new Audio('/sounds/bgm.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const currentData = allTests[testKey];

  // 음악 재생 제어
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStart = () => {
    // 브라우저 정책상 사용자 클릭 시점에 음악 재생 시작
    audioRef.current.play().catch(() => console.log("자동 재생 방지됨"));
    setIsPlaying(true);
    setStep('quiz');
  };

  const handleAnswer = (type) => {
    setScore(prev => ({ ...prev, [type]: (prev[type] || 0) + 1 }));
    if (currentIdx + 1 < currentData.questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const getTopType = () => {
    const aScore = score.analog || 0;
    const tScore = score.tech || 0;
    if (aScore >= 4) return "analog-high";
    if (tScore >= 4) return "tech-high";
    if (aScore > tScore) return "analog-mix";
    if (tScore > aScore) return "tech-mix";
    return "analog-mix";
  };

  const resultData = currentData.results[getTopType()] || currentData.results[Object.keys(currentData.results)[0]];

  return (
    <Container>
      {/* 배경음 제어 버튼 (우측 상단 플로팅) */}
      <SoundToggle onClick={toggleMusic}>
        {isPlaying ? '🎵 BGM ON' : '🔇 BGM OFF'}
      </SoundToggle>

      {step === 'start' && (
        <Card>
          <Badge>2026 Special Test</Badge>
          <Title>{currentData.mainTitle}</Title>
          <SubTitle>{currentData.subTitle}</SubTitle>
          {currentData.mainImage && (
            <MainImage src={currentData.mainImage} alt="메인" onError={(e) => e.target.style.display = 'none'} />
          )}
          <MainButton onClick={handleStart}>진단 시작하기</MainButton>
        </Card>
      )}

      {step === 'quiz' && (
        <Card>
          <Progress>{currentIdx + 1} / {currentData.questions.length}</Progress>
          {currentData.questions[currentIdx].image && (
            <QuestionImage src={currentData.questions[currentIdx].image} alt="질문" />
          )}
          <Question>{currentData.questions[currentIdx].question}</Question>
          {currentData.questions[currentIdx].answers.map((ans, i) => (
            <Option key={i} onClick={() => handleAnswer(ans.type)}>{ans.text}</Option>
          ))}
        </Card>
      )}

      {step === 'result' && <ResultPage data={resultData} />}
    </Container>
  );
};

// 결과 페이지 컴포넌트 (공유 기능 포함)
const ResultPage = ({ data }) => {
  const handleShare = async () => {
    const shareData = {
      title: '나의 진단 결과',
      text: `나의 영혼 타입은 [${data.title}]! 당신의 결과도 확인해보세요.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다! 🔗");
      }
    } catch (err) {
      console.log("공유 취소");
    }
  };

  return (
    <Card>
      <ResultTitle>"{data.title}"</ResultTitle>
      <img src={data.image} alt={data.title} style={{ width: '100%', borderRadius: '15px', marginBottom: '20px' }} />
      <ResultDesc>{data.desc}</ResultDesc>

      {/* 수호천사 앱 스타일의 '결과 공유하기' 버튼 */}
      <ShareButton onClick={handleShare}>
        나의 결과 공유하기 📤
      </ShareButton>

      <Divider />
      <h4 style={{ textAlign: 'left', marginBottom: '15px' }}>🌱 추천 아이템</h4>
      {data.products.map((p, i) => (
        <ProductLink key={i} href={p.link} target="_blank" rel="noreferrer">
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <strong>{p.name}</strong>
            <small style={{ color: '#888', marginTop: '4px' }}>{p.desc}</small>
          </div>
          <span style={{ color: '#7aa896' }}>→</span>
        </ProductLink>
      ))}
      <ResetButton onClick={() => window.location.reload()}>다시 테스트하기</ResetButton>
    </Card>
  );
};

/* --- 스타일 정의 --- */
const Container = styled.div` max-width: 480px; margin: 0 auto; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: #fdfaf1; position: relative; `;
const Card = styled.div` background: white; padding: 40px 30px; border-radius: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; width: 100%; `;
const Badge = styled.span` background: #e8f3ee; color: #5a7d6e; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; `;
const Title = styled.h1` font-size: 26px; color: #5a7d6e; margin: 20px 0 10px; `;
const SubTitle = styled.p` color: #888; font-size: 15px; margin-bottom: 30px; `;
const Question = styled.h2` font-size: 20px; margin: 20px 0 30px; line-height: 1.4; `;
const Progress = styled.div` font-size: 13px; color: #ccc; margin-bottom: 15px; `;
const MainButton = styled.button` background: #7aa896; color: white; border: none; padding: 15px 40px; border-radius: 50px; font-size: 18px; cursor: pointer; transition: 0.3s; &:hover { background: #5a7d6e; } `;
const Option = styled.button` width: 100%; background: #fff; border: 2px solid #f0f0f0; padding: 15px; margin-bottom: 10px; border-radius: 15px; cursor: pointer; transition: 0.2s; &:hover { border-color: #7aa896; background: #f9fdfb; } `;
const ResultTitle = styled.h2` font-size: 24px; color: #5a7d6e; margin-bottom: 20px; `;
const ResultDesc = styled.p` color: #666; line-height: 1.6; margin-bottom: 20px; `;
const Divider = styled.div` height: 1px; background: #eee; margin: 25px 0; `;
const ProductLink = styled.a` display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: #333; padding: 15px; border: 1px solid #eee; border-radius: 12px; margin-bottom: 10px; transition: 0.3s; &:hover { background: #f8fcfb; border-color: #7aa896; } `;
const ResetButton = styled.p` font-size: 13px; color: #aaa; text-decoration: underline; cursor: pointer; margin-top: 20px; `;

const MainImage = styled.img` width: 100%; max-width: 400px; height: auto; border-radius: 20px; margin: 10px 0 25px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); object-fit: cover; `;
const QuestionImage = styled.img` width: 100%; max-height: 200px; object-fit: cover; border-radius: 15px; margin: 10px 0 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); `;

const ShareButton = styled.button`
  width: 100%; background: #7aa896; color: white; border: none; padding: 16px; border-radius: 12px; 
  font-size: 16px; font-weight: bold; cursor: pointer; margin: 20px 0; transition: 0.3s;
  &:hover { background: #5a7d6e; transform: translateY(-2px); }
`;

const SoundToggle = styled.button`
  position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.7); border: 1px solid #eee;
  padding: 5px 10px; border-radius: 20px; font-size: 11px; color: #5a7d6e; cursor: pointer; z-index: 10;
`;

export default App;