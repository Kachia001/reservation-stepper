# Reservation Stepper

Nuxt 3 기반의 단계형 예약 플로우 프로젝트입니다.

사용자가 예약 정보를 한 번에 입력하는 대신, 단계별(stepper) UI를 따라 필요한 정보를 순서대로 입력하고 최종 확인 후 예약을 제출하는 흐름을 목표로 합니다.

## 기술 스택

### Frontend

- Nuxt 3
- Vue 3 Composition API
- shadcn/vue
- Tailwind CSS
- Pinia

### Backend

- Nuxt Nitro Server
- Express
- InversifyJS
- DDD(Domain-Driven Design)
- DI(Dependency Injection)

## 주요 목표

- 예약 과정을 단계별로 나누어 입력 부담 줄이기
- 현재 단계와 남은 단계를 명확하게 표시하기
- 단계별 입력값을 전역 상태로 안정적으로 관리하기
- 최종 제출 전에 예약 정보를 다시 확인할 수 있게 구성하기
- 재사용 가능한 UI 컴포넌트 기반으로 확장 가능한 구조 만들기
- 프론트엔드와 백엔드를 Nuxt 프로젝트 안에서 함께 관리하기
- 예약 도메인 로직을 DDD 구조로 분리하기
- InversifyJS 기반 DI로 의존성 결합도 낮추기

## 예약 플로우

기본 예약 흐름은 다음 단계를 기준으로 설계합니다.

1. 예약 유형 또는 방문 목적 선택
2. 날짜 및 시간 선택
3. 방문자 정보 입력
4. 예약 내용 확인
5. 예약 제출 완료

## 프로젝트 구조 예정

```text
reservation-stepper/
├─ assets/
│  └─ css/
├─ components/
│  ├─ ui/
│  └─ reservation/
├─ composables/
├─ layouts/
├─ lib/
├─ pages/
├─ stores/
├─ server/
│  ├─ api/
│  ├─ backend/
│  │  ├─ domain/
│  │  │  └─ reservation/
│  │  ├─ application/
│  │  │  └─ reservation/
│  │  ├─ infrastructure/
│  │  ├─ presentation/
│  │  │  └─ http/
│  │  └─ container/
│  └─ plugins/
├─ public/
├─ nuxt.config.ts
├─ tailwind.config.ts
└─ package.json
```

## 상태 관리 방향

예약 단계에서 입력되는 값은 Pinia store에서 관리합니다.

예상 관리 항목은 다음과 같습니다.

- 현재 step index
- 예약 유형
- 선택한 날짜 및 시간
- 방문자 정보
- 예약 확인 데이터
- 제출 상태

## UI 구성 방향

UI는 shadcn/vue 컴포넌트와 Tailwind CSS를 기반으로 구성합니다.

- 버튼, 카드, 입력 필드, 선택 UI는 shadcn/vue 컴포넌트 활용
- 레이아웃과 간격, 반응형 스타일은 Tailwind CSS로 제어
- stepper 관련 UI는 프로젝트 전용 컴포넌트로 분리

## Vue 컴포넌트 작성 규칙

`<script setup>`에서는 `defineProps`와 `defineEmits`를 직접 호출만 하지 않고, 반드시 변수에 할당해 사용합니다.

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

const emits = defineEmits<{
  submit: [value: string]
}>()
</script>

<template>
  <button type="button" @click="emits('submit', props.title)">Submit</button>
</template>
```

템플릿에서는 `$emit`을 직접 호출하지 않고, 할당한 `emits` 함수를 사용합니다. 짧은 이벤트 전달은 `@click="emits('eventName')"`처럼 템플릿에서 바로 호출하고, 별도 로직이 필요한 경우에만 handler 함수로 분리합니다.

## 포맷팅 규칙

코드 포맷팅은 Prettier를 기준으로 통일합니다.

- 세미콜론은 사용하지 않습니다.
- 문자열은 single quote를 사용합니다.
- trailing comma는 사용하지 않습니다.
- 기본 들여쓰기는 space 2칸을 사용합니다.
- 한 줄 길이는 100자를 기준으로 합니다.

포맷 적용:

```bash
npm run format
```

포맷 검사:

```bash
npm run format:check
```

## Git 설정

이 프로젝트는 merge commit을 명시적으로 남기고, pull 시에는 rebase로 최신 변경사항을 반영하는 흐름을 기준으로 합니다.

글로벌 Git 설정:

```bash
git config --global merge.ff false
git config --global pull.rebase true
```

- `merge.ff=false`: fast-forward가 가능한 상황에서도 merge commit을 생성합니다.
- `pull.rebase=true`: `git pull` 시 merge 대신 rebase로 로컬 커밋을 재배치합니다.

## 백엔드 구성 방향

백엔드는 Nuxt 자체 서버인 Nitro를 기반으로 구성합니다.

API 요청은 Nitro 서버 엔드포인트에서 처리하고, 내부적으로 Express 애플리케이션을 연결해 HTTP 라우팅과 미들웨어 구성을 담당하게 합니다.

도메인 로직은 Express 라우터에 직접 작성하지 않고 DDD 계층으로 분리합니다.

- `domain`: 예약 도메인의 핵심 규칙, 엔티티, 값 객체, 도메인 서비스
- `application`: 유스케이스, 커맨드/쿼리 처리, 트랜잭션 흐름
- `infrastructure`: 저장소 구현체, 외부 API, DB 접근, 기술 세부사항
- `presentation`: Express 라우터, 컨트롤러, request/response 변환
- `container`: InversifyJS DI 컨테이너와 의존성 바인딩

## DI 구성 방향

InversifyJS를 사용해 애플리케이션 계층이 구체 구현체에 직접 의존하지 않도록 구성합니다.

예상 DI 대상은 다음과 같습니다.

- 예약 유스케이스
- 예약 repository interface 및 구현체
- 컨트롤러
- 도메인 서비스
- 외부 서비스 클라이언트

애플리케이션 코드는 interface 또는 symbol token에 의존하고, 실제 구현체는 InversifyJS container에서 바인딩합니다.

## 개발 환경 세팅

Nuxt 프로젝트 생성 후 필요한 패키지를 설치합니다.

```bash
npx nuxi@latest init reservation-stepper
cd reservation-stepper
npm install
```

Pinia를 설치합니다.

```bash
npm install pinia @pinia/nuxt
```

백엔드 구성을 위한 패키지를 설치합니다.

```bash
npm install express inversify reflect-metadata
npm install -D @types/express
```

Tailwind CSS와 shadcn/vue는 Nuxt 환경에 맞춰 설정합니다.

```bash
npx shadcn-vue@latest init
```

## 실행 방법

개발 서버를 실행합니다.

```bash
npm run dev
```

기본 접속 주소는 다음과 같습니다.

```text
http://localhost:3000
```

## 현재 상태

현재 저장소는 Nuxt 3 기본 구조와 주요 라이브러리 세팅이 진행된 상태입니다.

프론트엔드는 Nuxt 표준 루트 구조(`pages`, `components`, `layouts`, `stores`)를 사용하고, 백엔드는 루트 `server` 디렉터리에서 Nitro API와 DDD 계층을 관리합니다.

## 앞으로 추가할 내용

- 예약 stepper 단계별 상세 컴포넌트 구현
- 단계별 페이지 또는 단일 페이지 플로우 구성
- 예약 제출 mock API 또는 실제 API 연동
- DB 또는 persistence adapter 선택
- 백엔드 예외 처리와 response format 표준화
