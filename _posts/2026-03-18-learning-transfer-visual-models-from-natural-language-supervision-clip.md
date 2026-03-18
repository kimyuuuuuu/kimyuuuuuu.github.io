---
title: Learnin Transfer Visual Models From Natural Language Supervision (CLIP) 
date: 2026-03-18
use_math: true
---
[CLIP paper (2021)](https://arxiv.org/abs/2103.00020) 리뷰 

## 기본 정보 
- 논문 제목: Learning Transferable Visual Models From Natural Language Supervision
- 저자/연구실: Alec Radford, Jong Wook Kim, et al. / OpenAI
- 학회/연도: ICML 2021 (ArXiv 2021)
- 핵심 키워드: #ContrastiveLearning #ZeroShotTransfer #VisionLanguage #FoundationModel #LargeScalePretraining
- GitHub: https://github.com/OpenAI/CLIP

## 1. Contribution & Motivation
### Problem Statement
- NLP는 인터넷의 방대한 텍스트로 직접 학습이 가능함 → **Task-agnostic**한 모델 
- 기존 CV 모델은 고정된 카테고리에 대해서만 예측 가능 
	- 새로운 개념을 배우려면 또 다른 레이블된 데이터셋이 필요
	⇒ 범용성 제한
### Key contribution 
- WIT (WebImageText) 데이터셋 : 4억개의 이미지-텍스트(caption) 쌍 구축
	- 기존의 고정된 label(단어, 하드코딩) 대신 caption(문장, 맥락 보유, text encoder) 활용, 훨씬 넓은 범위의 시각적 개념 포함
	- e.g.) label = 강아지 / caption = 공을 물고 달려가는 리트리버 (공 / 물다 / 달리다 / 리트리버)  
- Contrastive learning : 이미지와 텍스트 쌍의 연관성 학습 
	- "어떤 텍스트가 어떤 이미지와 짝을 이루는가"를 예측하는 대조학습으로 학습
- Zero-shot Capability : 자연어 프롬프트만으로 새로운 태스크에서 즉시 적용 가능

## Architecture & Pipeline
![CLIP approach](/assets/img/CLIP_architecture.png)
- Image Encoder(ResNet or ViT)와 Text Encoder(Masked self-attention (GPT style))가 독립적으로 존재, 각각의 출력을 공통 임베딩 공간으로 투영
- Input/Output
	- Input : $N$개의 이미지 $I$와 $N$개의 텍스트 $T$의 배치
	- Output : 이미지 임베딩 $I_e \in \mathbb{R}^{N \times d}$와 텍스트 임베딩 $T_e \in \mathbb{R}^{N \times d}$ . 
	- Similarity: $N \times N$ 유사도 행렬 생성
		- 대각선 : $N$개의 실제 쌍
		- 나머지 : $N^{2} - N$개의 가짜 쌍 
## Methodology & Theory 
- Contrastive learning: 주어진 이미지-텍스트가 쌍이 맞는가? 
	- $N$개의 (이미지, 텍스트) 배치 중 positive pair를 예측 
		- $N$개의 실제 쌍의 cosine similarity ↑
		- $N$개의 가짜 쌍의 cosine similarity ↓ 
		-  두 similarity의 symmetric cross entropy loss를 최적화 
- Loss Function: 이미지와 텍스트 각각에 대한 Cross-Entropy Loss의 평균  
	![CLIP loss](/assets/img/CLIP_loss.png)  
$$
\begin{align*}
\mathcal{L}_i &= -\frac{1}{N} \sum_{k=1}^N \log \frac{\exp(s_{k,k} / \tau)}{\sum_{j=1}^N \exp(s_{k,j} / \tau)} \\
\mathcal{L}_t &= -\frac{1}{N} \sum_{k=1}^N \log \frac{\exp(s_{k,k} / \tau)}{\sum_{j=1}^N \exp(s_{j,k} / \tau)} \\
\mathcal{L} &= \frac{\mathcal{L}_i + \mathcal{L}_t}{2}
\end{align*}
$$
	- $s_{k,j}$는 이미지 $k$와 텍스트 $j$ 임베딩 간의 코사인 유사도
	- Algorithm
		1. 이미지와 텍스트를 각각 인코딩
		2. L2-normalization 후 행렬 곱을 통해 유사도를 계산
		3. 대각선 요소(정답 짝)는 높이고, 나머지는 낮추도록 학습
		4. 테스트 시에는 클래스 명을 "A photo of a {label}." 형태의 프롬프트로 만들어 이미지와 대조
	- Theoretical Basis: InfoNCE Loss에 기반하며, 상호 정보량(Mutual Information)을 최대화하는 방식
## 4. Experiments & Results 
- Datasets: 사전학습에는 WIT(400M)를 사용하고, 평가는 ImageNet, CIFAR-10/100, STL-10, Pascal VOC 등 30개 이상의 데이터셋에서 수행
- Baselines: 완전히 지도 학습된 ResNet-50, 기존의 Zero-shot 방식(Visual N-Grams) 등.
- Performance
<div style="display: flex; gap: 10px;">
  <img src="/assets/img/CLIP_zeroshot.png" width="49%">
  <img src="/assets/img/CLIP_robustness.png" width="49%">
</div>
	- Zero-shot ImageNet: 76.2% 정확도로 기존의 지도 학습된 ResNet-50과 동등한 수준 달성.
	- Robustness: ImageNet-A, ImageNet-R 등 분포가 변화된 데이터셋에서 일반 지도 학습 모델보다 압도적으로 강건함.
- Ablation Study  
<div style="display: flex; gap: 10px;">
  <img src="/assets/img/CLIP_efficiency.png" width="49%">
  <img src="/assets/img/CLIP_prompvsensemble.png" width="49%">
</div>
	- Contrastive 방식이 Generative(Captioning) 방식보다 학습 효율이 4배 이상 높음을 증명.
	- 프롬프트 엔지니어링("A photo of a ...")이 단순 단어 사용보다 성능을 5% 가량 향상시킴.
## Authors & Genealogy
- Advisor/Lab: OpenAI (Alec Radford는 GPT-1, 2, 3의 핵심 저자).
- Related Work
	- ConVIRT (Zhang et al., 2020): 의료 도메인에서 먼저 제안된 대조 학습 방식.
	- VirTex / ICMLM: 텍스트를 통해 비전 모델을 학습하려던 초기 시도들.
- Follow-up
	- DALL-E: CLIP을 사용하여 생성된 이미지와 텍스트 간의 일치도를 평가
	- Stable Diffusion: CLIP의 Text Encoder를 조건부 입력 생성기로 사용.
	- ALIGN (Google): 1.8B 규모의 더 큰 데이터셋으로 CLIP을 확장함.

