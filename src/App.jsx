import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, results } from './data';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fdfaf1;
    margin: 0;
    font-family: 'Pretendard', sans-serif;
    color: #4a4a4a;
  }
`;

const App = () => {
  const [step, setStep] = useState('start'); // start, quiz, result
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState({ analog: 0, tech: 0 });

  const handleAnswer = (type) => {
    setScore({ ...score, [type]: score[type] + 1 });
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const getResultData = () => {
    return score.analog >= score.tech ? results["analog-high"] : results["tech-high"];
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <StepCard key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Badge>2026 데스크테리어 가이드</Badge>
              <Title>나의 업무 영혼 진단</Title>
              <SubTitle>나에게 꼭 맞는 책상 위 수호천사는?</SubTitle>
              <MainButton onClick={() => setStep('quiz')}>진단 시작하기</MainButton>
            </StepCard>
          )}

          {step === 'quiz' && (
            <StepCard key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Progress>{currentIdx + 1} / {questions.length}</Progress>
              <QuestionText>{questions[currentIdx].question}</QuestionText>
              {questions[currentIdx].answers.map((ans, i) => (
                <OptionButton key={i} onClick={() => handleAnswer(ans.type)}>
                  {ans.text}
                </OptionButton>
              ))}
            </StepCard>
          )}

          {step === 'result' && (
            <ResultStep data={getResultData()} />
          )}
        </AnimatePresence>
      </Container>
    </>
  );
};

// 결과 컴포넌트 (제휴 링크 섹션 포함)
const ResultStep = ({ data }) => (
  <StepCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <ResultHeader>당신의 업무 영혼은...</ResultHeader>
    <ResultTitle>"{data.title}"</ResultTitle>
    <ResultImg src={data.image} />
    <ResultDesc>{data.desc}</ResultDesc>

    <Divider />
    <SectionTitle>🌱 추천 데스크테리어 아이템</SectionTitle>
    {data.products.map((p, i) => (
      <ProductCard key={i} href={p.link} target="_blank">
        <div style={{ textAlign: 'left' }}>
          <strong>{p.name}</strong>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#888' }}>{p.desc}</p>
        </div>
        <Arrow>→</Arrow>
      </ProductCard>
    ))}
    <ResetButton onClick={() => window.location.reload()}>다시 테스트하기</ResetButton>
  </StepCard>
);

/* --- 스타일 정의 --- */
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StepCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 40px 30px;
  border-radius: 30px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
  text-align: center;
  width: 100%;
`;

const Title = styled.h1` font-size: 28px; margin: 10px 0; color: #5a7d6e; `;
const Badge = styled.span` background: #e8f3ee; color: #5a7d6e; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; `;
const SubTitle = styled.p` color: #888; margin-bottom: 30px; `;

const MainButton = styled.button`
  background: #7aa896; color: white; border: none; padding: 15px 40px;
  border-radius: 50px; font-size: 18px; cursor: pointer; transition: 0.3s;
  &:hover { background: #6a9685; transform: translateY(-2px); }
`;

const OptionButton = styled.button`
  width: 100%; background: white; border: 2px solid #e8f3ee; padding: 18px;
  margin-bottom: 15px; border-radius: 15px; cursor: pointer; font-size: 16px;
  transition: 0.2s;
  &:hover { background: #f4f9f7; border-color: #7aa896; }
`;

const ResultTitle = styled.h2` font-size: 32px; color: #5a7d6e; margin-bottom: 20px; `;
const ResultImg = styled.img` width: 100%; border-radius: 20px; margin-bottom: 20px; `;
const ResultDesc = styled.p` line-height: 1.6; color: #666; margin-bottom: 30px; `;

const Divider = styled.div` height: 1px; background: #eee; margin: 30px 0; `;
const SectionTitle = styled.h3` font-size: 18px; color: #444; margin-bottom: 20px; text-align: left; `;

const ProductCard = styled.a`
  display: flex; justify-content: space-between; align-items: center;
  text-decoration: none; color: inherit; background: white;
  padding: 20px; border-radius: 15px; border: 1px solid #eee; margin-bottom: 12px;
  transition: 0.3s;
  &:hover { border-color: #7aa896; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
`;

const Arrow = styled.span` color: #7aa896; font-weight: bold; `;
const ResetButton = styled.p` font-size: 14px; color: #aaa; text-decoration: underline; cursor: pointer; margin-top: 30px; `;

export default App;