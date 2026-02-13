export const questions = [
    {
        id: 1,
        question: "당신이 꿈꾸는 완벽한 작업 공간의 창밖 풍경은?",
        answers: [
            { text: "비 내리는 조용한 숲속", type: "analog" },
            { text: "네온사인이 반짝이는 도심", type: "tech" }
        ]
    },
    {
        id: 2,
        question: "업무 시작 전, 책상을 정리하는 당신의 스타일은?",
        answers: [
            { text: "소품들의 위치를 정성껏 맞춘다", type: "analog" },
            { text: "불필요한 물건은 일단 다 치운다", type: "tech" }
        ]
    },
    {
        id: 3,
        question: "가장 기분 좋게 들리는 작업 소음(ASMR)은?",
        answers: [
            { text: "찻주전자 소리와 연필 사각거림", type: "analog" },
            { text: "기계식 키보드와 로파이 비트", type: "tech" }
        ]
    },
    {
        id: 4,
        question: "영감이 떠올랐을 때, 당신의 메모 도구는?",
        answers: [
            { text: "손때 묻은 종이 노트와 만년필", type: "analog" },
            { text: "스마트폰 메모 앱이나 태블릿", type: "tech" }
        ]
    },
    {
        id: 5,
        question: "나를 가장 힘나게 하는 책상 위 '작은 사치'는?",
        answers: [
            { text: "계절감을 느낄 수 있는 작은 꽃병", type: "analog" },
            { text: "성능 좋은 무선 충전 거치대", type: "tech" }
        ]
    }
];

export const results = {
    "analog-high": {
        title: "숲속 오두막의 기록가",
        desc: "따뜻한 나무의 질감과 은은한 조명 아래서 창의력이 샘솟는 타입입니다.",
        image: "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?auto=format&fit=crop&w=800", // 지브리풍 데스크 이미지로 대체 가능
        products: [
            { name: "원목 모니터 받침대", link: "#", desc: "자연의 결을 느낄 수 있는 디자인" },
            { name: "빈티지 데스크 스탠드", link: "#", desc: "따스한 색온도로 집중력 향상" }
        ]
    },
    "tech-high": {
        title: "구름 위 도시의 설계자",
        desc: "최첨단 기기와 깔끔한 선 정리를 통해 완벽한 몰입을 즐기는 타입입니다.",
        image: "https://images.unsplash.com/photo-1491933382434-50028619b54b?auto=format&fit=crop&w=800",
        products: [
            { name: "RGB 모니터 라이트 바", link: "#", desc: "눈의 피로를 줄이는 테크 아이템" },
            { name: "버티컬 무선 마우스", link: "#", desc: "손목의 자유를 선사하는 공학적 선택" }
        ]
    }
};