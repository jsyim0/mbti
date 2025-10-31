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
  ISTJ: { title: "현실적 관리자", desc: "실용적이고 책임감이 강한 타입.", color: "#607D8B", icon: "📘" },
  ISFJ: { title: "헌신적인 보호자", desc: "타인을 돕는 따뜻한 마음의 소유자.", color: "#81C784", icon: "🫶" },
  INFJ: { title: "통찰력 있는 조언자", desc: "깊은 이해와 통찰을 가진 이상주의자.", color: "#9575CD", icon: "🧘‍♀️" },
  INTJ: { title: "전략적 계획가", desc: "논리적이고 목표 지향적인 분석가.", color: "#7E57C2", icon: "♟️" },
  ISTP: { title: "문제 해결사", desc: "즉각적이고 현실적인 문제 해결에 능함.", color: "#4DB6AC", icon: "🛠️" },
  ISFP: { title: "예술가", desc: "감성적이고 조용한 자유인.", color: "#F48FB1", icon: "🎨" },
  INFP: { title: "이상주의자", desc: "자신의 가치에 충실한 창의적 사색가.", color: "#BA68C8", icon: "💫" },
  INTP: { title: "논리적 사색가", desc: "분석적이고 독창적인 사고를 지님.", color: "#7986CB", icon: "🧩" },
  ESTP: { title: "모험가", desc: "즉흥적이고 에너지 넘치는 활동가.", color: "#64B5F6", icon: "🏍️" },
  ESFP: { title: "엔터테이너", desc: "사람들을 즐겁게 하는 사교적 인물.", color: "#FFB74D", icon: "🎤" },
  ENFP: { title: "열정적인 촉진자", desc: "창의적이고 활기찬 사람 중심형.", color: "#FF8A65", icon: "🔥" },
  ENTP: { title: "혁신가", desc: "새로운 아이디어를 즐기는 발명가.", color: "#AED581", icon: "💡" },
  ESTJ: { title: "관리자", desc: "체계적이고 실용적인 조직가.", color: "#90A4AE", icon: "📋" },
  ESFJ: { title: "친절한 조정자", desc: "사람들을 조화롭게 이끄는 협력가.", color: "#81D4FA", icon: "🤝" },
  ENFJ: { title: "지도자", desc: "타인을 이끌며 영감을 주는 리더.", color: "#F06292", icon: "🌟" },
  ENTJ: { title: "지휘관", desc: "결단력과 추진력이 강한 리더.", color: "#FF7043", icon: "🦁" },
};

let current = 0;
const answers = {};
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const intro = document.getElementById("intro");
const app = document.getElementById("app");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  intro.classList.add("hidden");
  app.classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  if (current >= questions.length) {
    showResult();
    return;
  }
  const q = questions[current];
  quiz.classList.add("fade");
  quiz.innerHTML = `
    <div class="progress"><div class="progress-bar" style="width:${(current / questions.length) * 100}%"></div></div>
    <h2>Q${current + 1}/${questions.length}: ${q.text}</h2>
    <button onclick="answer('${q.a.side}')">${q.a.text}</button>
    <button onclick="answer('${q.b.side}')">${q.b.text}</button>
  `;
}

function answer(side) {
  answers[questions[current].axis] = (answers[questions[current].axis] || "") + side;
  current++;
  setTimeout(renderQuestion, 200);
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
  const data = descriptions[type];
  quiz.classList.add("hidden");
  result.classList.remove("hidden");
  result.style.backgroundColor = data?.color || "#ccc";
  result.innerHTML = `
    <div class="fade" style="padding:20px; border-radius:20px; background:white; color:#333; text-align:center;">
      <div style="font-size:48px;">${data.icon}</div>
      <h2>${type} - ${data.title}</h2>
      <p>${data.desc}</p>
      <button onclick="restart()">다시하기</button>
    </div>
  `;
}

function restart() {
  current = 0;
  for (let key in answers) delete answers[key];
  result.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
}
