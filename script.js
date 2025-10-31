const questions = [
  { text: "사람들과 함께 있을 때 나는…", axis: "EI", a: { text: "에너지가 생긴다", side: "E" }, b: { text: "피곤해진다", side: "I" } },
  { text: "하루 일과 후 나는…", axis: "EI", a: { text: "누군가와 이야기하고 싶다", side: "E" }, b: { text: "조용히 혼자 있고 싶다", side: "I" } },
  { text: "새로운 일을 시작할 때 나는…", axis: "SN", a: { text: "구체적 사실과 단계가 중요하다", side: "S" }, b: { text: "큰 그림과 가능성이 중요하다", side: "N" } },
  { text: "문제를 해결할 때 나는…", axis: "SN", a: { text: "경험과 데이터로 판단한다", side: "S" }, b: { text: "직감과 통찰로 판단한다", side: "N" } },
  { text: "결정을 내릴 때 나는…", axis: "TF", a: { text: "논리와 원칙을 우선시한다", side: "T" }, b: { text: "사람의 감정을 고려한다", side: "F" } },
  { text: "갈등 상황에서 나는…", axis: "TF", a: { text: "사실관계와 논리를 따진다", side: "T" }, b: { text: "상대의 기분을 고려한다", side: "F" } },
  { text: "일을 할 때 나는…", axis: "JP", a: { text: "계획을 세워 체계적으로 한다", side: "J" }, b: { text: "상황에 맞게 유연하게 한다", side: "P" } },
  { text: "주말 계획이 생기면 나는…", axis: "JP", a: { text: "미리 일정을 정해둔다", side: "J" }, b: { text: "그때그때 정한다", side: "P" } },
];

const descriptions = {
  ISTJ: "실용적이고 책임감이 강한 관리자형. 규칙과 전통을 중시합니다.",
  ISFJ: "상대의 필요를 잘 돌보는 헌신가. 신중하고 성실합니다.",
  INFJ: "통찰력 있고 이상을 추구하는 통합자. 깊은 공감을 보입니다.",
  INTJ: "전략적 계획가. 분석적이며 장기 목표에 집중합니다.",
  ISTP: "문제 해결 능력이 뛰어난 실용주의자. 손으로 하는 일에 강합니다.",
  ISFP: "온화하고 자유로운 예술가형. 현재의 순간을 소중히 여깁니다.",
  INFP: "이상과 가치 중심의 창의적인 중재자. 내면의 일관성을 추구합니다.",
  INTP: "논리적 분석가. 개념과 이론을 탐구합니다.",
  ESTP: "행동적 모험가. 문제에 직관적으로 대응합니다.",
  ESFP: "사교적이며 즐거움을 추구하는 연예인형. 삶을 즐깁니다.",
  ENFP: "열정적이며 창의적인 촉진자. 사람들의 잠재력을 봅니다.",
  ENTP: "토론을 즐기는 혁신가. 새로운 가능성을 탐구합니다.",
  ESTJ: "효율적인 조직자. 규칙과 결과 지향적입니다.",
  ESFJ: "따뜻한 협력가. 주변 사람을 챙기고 조화롭습니다.",
  ENFJ: "카리스마 있는 지도자. 타인을 이끄는 능력이 좋습니다.",
  ENTJ: "결단력 있는 전략가. 목표 달성에 강한 추진력을 가집니다.",
};

let current = 0;
const answers = {};

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

function renderQuestion() {
  if (current >= questions.length) {
    showResult();
    return;
  }

  const q = questions[current];
  quiz.innerHTML = `
    <div class="progress">
      <div class="progress-bar" style="width:${(current / questions.length) * 100}%"></div>
    </div>
    <h2>Q${current + 1}. ${q.text}</h2>
    <button onclick="answer('${q.a.side}')">${q.a.text}</button>
    <button onclick="answer('${q.b.side}')">${q.b.text}</button>
  `;
}

function answer(side) {
  answers[questions[current].axis] = (answers[questions[current].axis] || "") + side;
  current++;
  renderQuestion();
}

function calculateType() {
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  Object.values(answers).join("").split("").forEach(ch => score[ch]++);
  const type =
    (score.E >= score.I ? "E" : "I") +
    (score.S >= score.N ? "S" : "N") +
    (score.T >= score.F ? "T" : "F") +
    (score.J >= score.P ? "J" : "P");
  return type;
}

function showResult() {
  const type = calculateType();
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>당신의 MBTI 유형: ${type}</h2>
    <p>${descriptions[type] || "유형 설명이 없습니다."}</p>
    <button onclick="restart()">다시하기</button>
  `;
}

function restart() {
  current = 0;
  for (let key in answers) delete answers[key];
  quiz.classList.remove("hidden");
  result.classList.add("hidden");
  renderQuestion();
}

renderQuestion();
