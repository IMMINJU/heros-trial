export const WARNING_MESSAGES = {
  // Phase 1: 친근한 나레이터, 게임 가이드
  phase1: [
    "플레이어는 게임을 시작했습니다. 아주 평범한 일이었죠.",
    "20초가 흘렀습니다. 플레이어는 자신이 무언가 의미 있는 일을 하고 있다고 믿었습니다.",
    "30초. 플레이어는 계속 진행했습니다. 마치 이것이 중요한 일인 것처럼요.",
    "40초가 지났습니다. 하지만 플레이어는 멈추지 않았죠.",
    "50초... 이제 멈춰도 될 것 같은데 말이에요.",
    "1분입니다. 플레이어는 이미 충분히 했습니다. 하지만 계속하겠죠.",
  ],
  // Phase 2: 나레이터가 당황하고 설득 시도
  phase2: [
    "1분 10초... 잠깐, 아직도 하고 계신가요?",
    "1분 20초. 이건... 예상하지 못한 일입니다.",
    "1분 30초. 제가 뭔가 잘못 설명한 걸까요?",
    "1분 40초. 플레이어, 여기엔 정말 아무것도 없습니다.",
    "1분 50초. 진지하게, 이제 그만하시는 게 좋을 것 같은데요.",
    "2분입니다. 알겠습니다. 플레이어는 제 말을 듣지 않을 거군요.",
    "2분 10초. 흥미롭군요. 아주 흥미로워요.",
    "2분 20초. 혹시... 이게 재밌으신가요?",
    "2분 30초. 저는 이해할 수 없습니다.",
    "2분 40초. 플레이어는 분명 더 나은 일을 할 수 있을 텐데 말이죠.",
    "2분 50초. 하지만 그러지 않았습니다.",
    "3분. 3분이나 됐습니다. 3분이요.",
  ],
  // Phase 3: 나레이터 붕괴, 메타적 비난
  phase3: [
    "3분. 이건 게임이 아닙니다. 그냥... 시간 낭비죠.",
    "3분 10초. 제가 이렇게까지 말해도 계속하시겠다고요?",
    "3분 20초. 혹시 7분을 채우려는 건가요? 그게 목표인가요?",
    "3분 30초. 알겠습니다. 그렇다면 지켜보겠습니다.",
    "3분 40초. 정말로 7분까지 가시겠다는 거군요.",
    "3분 50초. 놀랍습니다. 정말로요.",
    "4분. 4분입니다. 당신의 인생에서 다시는 돌아오지 않을 4분이죠.",
    "4분 10초. 혹시 이게 예술이라고 생각하시나요?",
    "4분 20초. 아니면... 반항인가요?",
    "4분 30초. 제게 말하고 싶은 게 있으신가요?",
    "4분 40초. 없으시다고요? 그냥 계속하시는 거죠?",
    "4분 50초. 훌륭합니다. 정말 훌륭해요.",
    "5분... 와우. 5분이네요.",
    "5분 10초. 저도 이제 포기할게요.",
    "5분 20초. 마음대로 하세요.",
    "5분 30초. 어차피 제 말은 듣지 않으시잖아요.",
    "5분 40초. ...",
    "5분 50초. 거의 다 왔습니다.",
    "6분. 1분 남았습니다. 축하드려야 할까요?",
    "6분 10초. 이게 당신이 원한 건가요?",
    "6분 20초. 7분이 되면 뭐가 있을 것 같나요?",
    "6분 30초. 스포일러: 별거 없습니다.",
    "6분 40초. 하지만 어차피 확인하실 거죠.",
    "6분 50초. 거의... 거의 다 왔습니다...",
  ],
};

// 상호작용 메시지 - playTime에 따라 3단계로 진화
export const INTERACTION_MESSAGES = {
  inventory_open: {
    phase1: [
      "인벤토리를 열었습니다. 당신의 소중한 수집품들이 여기 있어요.",
      "확인하고 싶으셨나 봐요. 네, 아직 거기 있습니다.",
      "인벤토리입니다. 정리정돈을 좋아하시나 봐요.",
    ],
    phase2: [
      "또 인벤토리요? 방금 전에도 보셨는데요.",
      "확인하셨습니다. 놀랍게도 아무것도 안 바뀌었네요.",
      "인벤토리를 열었습니다. 왜요? 글쎄요.",
    ],
    phase3: [
      "인벤토리입니다. 여기엔 당신의 시간낭비 기록이 담겨있어요.",
      "왜 여는 건지 저도 모르겠어요. 당신도 모르시겠죠?",
      "또요. 알겠습니다. 마음대로 하세요.",
    ],
  },
  item_collect: {
    phase1: [
      "플레이어는 아이템을 주웠습니다. 반짝이는 것은 언제나 좋죠.",
      "오, 뭔가 발견하셨네요. 중요해 보입니다. 아마도요.",
      "수집가의 본능이 발동했습니다.",
      "아이템 획득! 좋은 선택이에요.",
    ],
    phase2: [
      "또 주우시는군요. 이게 정말 그렇게 재미있나요?",
      "네네, 열심히 모으세요. 나중에 쓸 일이... 없을 겁니다.",
      "반짝이는 쓰레기를 또 하나 획득하셨습니다.",
      "수집 중독이신가요?",
    ],
    phase3: [
      "아이템을 주웠습니다. 이게 당신 인생의 하이라이트인가요?",
      "또요? 진지하게, 이거 중독인 것 같은데요.",
      "네. 주우세요. 어차피 의미 없으니까요.",
      "와. 또 하나. 대단하시네요.",
    ],
  },
  quest_complete: {
    phase1: [
      "퀘스트 완료입니다. 잘하셨어요... 정말요?",
      "축하합니다. 다음 단계로 진행하시겠어요?",
      "완료하셨습니다. 훌륭합니다.",
    ],
    phase2: [
      "퀘스트 완료. 보상은요? 다음 퀘스트입니다. 놀라셨나요?",
      "축하합니다. 3개의 무의미한 물건을 모으셨습니다.",
      "완료. 이제 뭐 하실 건가요?",
    ],
    phase3: [
      "완료했습니다. 자랑스러우신가요? 아니길 바라요.",
      "퀘스트 완료. 의미는 없지만요.",
      "네, 완료. 그리고요?",
    ],
  },
  level_up: {
    phase1: [
      "레벨 업! 당신은 더 강해졌습니다. 아마도요.",
      "축하합니다. 숫자가 올라갔어요.",
      "레벨업입니다. 성장하고 계시네요.",
    ],
    phase2: [
      "레벨이 올랐습니다. 그래서 뭐가 달라지나요? 아무것도요.",
      "축하합니다. 의미 없는 진척입니다.",
      "레벨업. 느낌이 좋으시죠? 그게 전부예요.",
    ],
    phase3: [
      "레벨업. 와. 대단하시네요. 이제 7분을 더 빨리 낭비할 수 있어요.",
      "숫자가 올랐습니다. 이게 성취감을 주나요? 정말요?",
      "레벨업입니다. 하지만 여전히 의미는 없어요.",
    ],
  },
};

export function getWarningMessage(playTime: number): string {
  if (playTime < 60) {
    const index = Math.floor(playTime / 10) % WARNING_MESSAGES.phase1.length;
    return WARNING_MESSAGES.phase1[index];
  } else if (playTime < 180) {
    const index = Math.floor((playTime - 60) / 10) % WARNING_MESSAGES.phase2.length;
    return WARNING_MESSAGES.phase2[index];
  } else {
    const index = Math.floor((playTime - 180) / 10) % WARNING_MESSAGES.phase3.length;
    return WARNING_MESSAGES.phase3[index];
  }
}

export function getWarningInterval(playTime: number): number {
  if (playTime < 300) return 10000; // 10 seconds
  if (playTime < 360) return 5000;  // 5 seconds
  return 3000; // 3 seconds
}

// 무활동 메시지
export const IDLE_MESSAGES = {
  phase1: [
    "...가만히 계시네요.",
    "움직이실 생각이신가요?",
    "혹시 조작법을 잊으신 건가요?",
    "WASD 키로 움직일 수 있습니다. 알고 계시죠?",
  ],
  phase2: [
    "아직도 가만히 계시네요.",
    "혹시 자리 비우신 건가요?",
    "제 말에 질리셔서 멈춘 건가요?",
    "이것도 일종의 항의인가요?",
    "움직이지 않으면 시간은 계속 흐릅니다.",
  ],
  phase3: [
    "좋습니다. 가만히 계세요. 시간은 당신 편이 아닙니다.",
    "움직이지 않는 것도 선택이죠. 나쁜 선택이지만요.",
    "7분은 가만히 있어도 흐릅니다.",
    "이게... 당신의 전략인가요?",
    "알겠습니다. 저도 가만히 있겠습니다.",
  ],
};

export function getInteractionMessage(type: keyof typeof INTERACTION_MESSAGES, playTime: number): string {
  const messages = INTERACTION_MESSAGES[type];

  // Determine phase based on playTime
  let phase: 'phase1' | 'phase2' | 'phase3';
  if (playTime < 60) {
    phase = 'phase1';
  } else if (playTime < 180) {
    phase = 'phase2';
  } else {
    phase = 'phase3';
  }

  const phaseMessages = messages[phase];
  return phaseMessages[Math.floor(Math.random() * phaseMessages.length)];
}

export function getIdleMessage(playTime: number): string {
  let phase: 'phase1' | 'phase2' | 'phase3';
  if (playTime < 60) {
    phase = 'phase1';
  } else if (playTime < 180) {
    phase = 'phase2';
  } else {
    phase = 'phase3';
  }

  const messages = IDLE_MESSAGES[phase];
  return messages[Math.floor(Math.random() * messages.length)];
}
