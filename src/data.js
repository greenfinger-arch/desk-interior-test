export const allTests = {
    // 1. 데스크테리어 테스트 (주소창에 ?id=deskterior 입력 시 호출)
    "deskterior": {
        mainTitle: "나의 업무 영혼 진단",
        mainImage: "/images/desk-main.jpg", // 이 테스트만의 메인 이미지
        subTitle: "나의 업무 스타일에 꼭 맞는 데스크테리어는?",
        questions: [
            {
                id: 1,
                question: "당신이 꿈꾸는 완벽한 작업 공간의 창밖 풍경은?",
                // public/images/ 폴더 안에 q1_forest.jpg 파일이 있다고 가정할 때
                image: "/images/q1_forest.jpg",
                answers: [
                    { text: "비 내리는 조용한 숲속", type: "analog" },
                    { text: "네온사인이 반짝이는 도심", type: "tech" }
                ]
            },
            {
                id: 2,
                question: "업무 시작 전, 책상을 정리하는 당신의 스타일은?",
                image: "/images/q2_desk.jpg",
                answers: [
                    { text: "소품들의 위치를 정성껏 맞춘다", type: "analog" },
                    { text: "불필요한 물건은 일단 다 치운다", type: "tech" }
                ]
            },
            {
                id: 3,
                question: "가장 기분 좋게 들리는 작업 소음(ASMR)은?",
                // public/images/ 폴더 안에 q1_forest.jpg 파일이 있다고 가정할 때
                image: "/images/q3_noise.jpg",
                answers: [
                    { text: "찻주전자 소리와 연필 사각거림", type: "analog" },
                    { text: "기계식 키보드와 로파이 비트", type: "tech" }
                ]
            },
            {
                id: 4,
                question: "갑자기 영감이 떠올랐을 때, 당신의 메모 도구는?",
                // public/images/ 폴더 안에 q1_forest.jpg 파일이 있다고 가정할 때
                image: "/images/q4_memo.jpg",
                answers: [
                    { text: "손때 묻은 종이 노트와 만년필", type: "analog" },
                    { text: "스마트폰 메모 앱이나 태블릿", type: "tech" }
                ]
            },
            {
                id: 5,
                question: "나를 가장 힘나게 하는 책상 위 '작은 사치'는?",
                // public/images/ 폴더 안에 q1_forest.jpg 파일이 있다고 가정할 때
                image: "/images/q5_luxury.jpg",
                answers: [
                    { text: "계절감을 느낄 수 있는 작은 꽃병", type: "analog" },
                    { text: "성능 좋은 고속 무선 충전 거치대", type: "tech" }
                ]
            }
        ],
        results: {
            // 결과 도출 로직에 따라 매칭될 키값들
            "analog-high": {
                title: "숲속 오두막의 기록가",
                desc: "따뜻한 나무의 질감과 은은한 조명 아래서 창의력이 샘솟는 타입입니다.",
                image: "/images/r1_recorder.jpg",
                products: [
                    { name: "원목 모니터 받침대", desc: "자연의 결을 느낄 수 있는 따뜻한 디자인", link: "https://your-affiliate-link.com/1" },
                    { name: "빈티지 황동 스탠드", desc: "아날로그 감성을 더해주는 집중력 조명", link: "https://your-affiliate-link.com/2" }
                ]
            },
            "tech-high": {
                title: "구름 위 도시의 설계자",
                desc: "최첨단 기기와 깔끔한 선 정리를 통해 완벽한 몰입 상태를 즐기는 타입입니다.",
                image: "/images/r2_designer.jpg",
                products: [
                    { name: "RGB 모니터 라이트 바", desc: "화면 반사 없이 눈의 피로를 줄여주는 아이템", link: "https://your-affiliate-link.com/3" },
                    { name: "버티컬 무선 마우스", desc: "장시간 업무에도 손목의 자유를 선사하는 선택", link: "https://your-affiliate-link.com/4" }
                ]
            },
            "analog-mix": {
                title: "비밀 정원의 예술가",
                desc: "좋아하는 물건들에 둘러싸여 있을 때 가장 안정감을 느끼며 아이디어가 폭발합니다.",
                image: "/images/r3_artist.jpg",
                products: [
                    { name: "수채화풍 대형 데스크 매트", desc: "책상 전체를 지브리 감성으로 변신", link: "https://your-affiliate-link.com/5" },
                    { name: "모듈형 벽면 타공판", desc: "소중한 엽서와 피규어를 위한 전시 공간", link: "https://your-affiliate-link.com/6" }
                ]
            },
            "tech-mix": {
                title: "바람 계곡의 미니멀리스트",
                desc: "군더더기 없는 배치와 직관적인 도구 사용을 선호하는 효율주의자입니다.",
                image: "/images/r4_minimalist.jpg",
                products: [
                    { name: "펠트 데스크 오거나이저", desc: "모든 소품에 제 자리를 찾아주는 정돈 도구", link: "https://your-affiliate-link.com/7" },
                    { name: "알루미늄 노트북 거치대", desc: "가볍고 견고한 미니멀 워크스테이션 구축", link: "https://your-affiliate-link.com/8" }
                ]
            }
        }
    }
};