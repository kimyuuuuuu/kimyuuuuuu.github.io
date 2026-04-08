---
title: "GradNorm과 Loss Balancing"
date: 2026-04-08
categories: [Multi-Task-Learning, paper-review]
math: true
---

# 0. Outline

- **Category:** Optimization & Multitask Learning (MTL)
- **Context:** 여러 태스크를 동시에 학습할 때 특정 태스크가 그래디언트 크기나 학습 속도 면에서 지배적(dominant)이 되어 전체 성능을 저해하는 문제를 해결하고자 함.
- **Correctness:** "태스크 간 불균형은 역전파되는 그래디언트의 불균형으로 나타난다"는 가설을 세우고, 이를 조정하기 위한 복원력 $alpha$ 개념을 도입함.
- **Contribution:** 단일 하이퍼파라미터 $alpha$만으로 동적인 loss 가중치 조절이 가능한 알고리즘 제안.
- **Clarity:** 수학적 정의가 명확하며, 합성 데이터(Synthetic)와 실제 데이터(NYUv2, MTFL)를 통해 효과를 입증함.

---

# 1. 논지 (Contribution & Motivation)

- **Problem Statement:** MTL 네트워크는 공유된 특징(shared features)을 학습해야 하지만, 태스크마다 loss의 스케일과 학습 난이도가 달라 특정 태스크가 학습을 주도하거나 무시되는 현상이 발생함 태스크 불균형은 역전파되는 그래디언트의 크기 차이로 나타나며, 지배적인 태스크가 학습 역학을 왜곡함.
- **Key Contribution:** 그래디언트 노름(norm)을 공통 척도로 맞추고, 각 태스크의 상대적 학습 속도에 따라 가중치를 동적으로 조절하는 **GradNorm** 알고리즘을 제안함 GradNorm은 그래디언트 크기를 동적으로 튜닝하여 딥 멀티태스크 모델의 학습 균형을 자동으로 맞춤.
- **Critical View:** 이 논문의 성능 향상은 모델 구조의 변경이 아니라, **학습 역학(training dynamics)의 정교한 제어**에서 기인함. 특히 그리드 서치(grid search) 없이도 최적의 가중치 조합을 단일 실행으로 찾아낸다는 점이 매우 강력함 GradNorm은 단일 하이퍼파라미터 $alpha$만으로 방대한 그리드 서치 결과와 대등하거나 이를 능가하는 성능을 보임.

---

# 2. 구성 (Architecture & Pipeline)

- **Input/Output:** 입력 이미지(예: NYUv2 320x320)가 공통 인코더를 거쳐 여러 태스크 헤드(Segmentation, Depth, Normals 등)로 분기되어 출력됨 VGG-style 또는 ResNet-50 기반 인코더를 공유하며 각 태스크별 출력을 생성함.
- **Module:** 
    - **Shared Weights (\(W\)):** 일반적으로 마지막 공유 계층의 가중치를 기준으로 그래디언트를 계산하여 연산 효율을 높임 \(W\)는 연산 비용 절감을 위해 주로 마지막 공유 레이어의 가중치 부분집합으로 선택됨.
    - **Adaptive Weights (\(w_i(t)\)):** 각 태스크 loss 앞에 붙는 학습 가능한 가중치로, GradNorm에 의해 매 스텝 업데이트됨.

---

# 3. 방법론 (Methodology & Theory)
![grad_norm](/assets/img/grad_norm.png)  

### **Loss Function**
전체 목적 함수는 다음과 같이 정의됩니다:
\[L(t) = \sum_i w_i(t) L_i(t)\]

GradNorm은 별도의 'gradient loss' \(L_{grad}\)를 최소화하여 \(w_i(t)\)를 업데이트합니다 GradNorm은 실제 그래디언트 노름과 타겟 노름 사이의 L1 손실 함수인 \(L_{grad}\)를 통해 구현됨:
\[L_{grad}(t; w_i(t)) = \sum_i \left| G_W^{(i)}(t) - \bar{G}_W(t) \times [r_i(t)]^\alpha \right|_1\]

### **Key Metrics**
- **Gradient Norm:** \(G_W^{(i)}(t) = \|\nabla_W w_i(t) L_i(t)\|_2\) (가중치가 반영된 태스크 \(i\)의 그래디언트 노름)
- **Loss Ratio:** \(\tilde{L}_i(t) = L_i(t) / L_i(0)\) (태스크 \(i\)의 학습 진행률)
- **Relative Inverse Training Rate:** \(r_i(t) = \tilde{L}_i(t) / E_{task}[\tilde{L}_i(t)]\) (전체 평균 대비 해당 태스크가 얼마나 느리게 학습되는지의 비율) \(\tilde{L}_i(t)\)는 태스크 \(i\)의 역학습률 측정치이며, 낮은 값일수록 학습이 빠름을 의미함.

### **Algorithm Logic**
학습이 느린 태스크(\(r_i(t)\)가 큼)는 더 큰 그래디언트 노름을 갖도록 타겟이 설정되어 \(w_i(t)\)가 증가하고, 반대의 경우 감소합니다. \(\alpha\)는 이러한 복원력의 강도를 조절합니다 \(r_i(t)\)가 높을수록 해당 태스크가 더 빨리 학습되도록 더 높은 그래디언트 크기를 권장하며, \(\alpha\)는 이를 조절하는 복원력의 강도임.

---

# 4. 실험 및 데이터 (Experiments & Results)

- **Datasets:** 
    - **Synthetic:** Loss 스케일이 1:100인 태스크 실험 \(\sigma=(1.0, 100.0)\)인 2개 태스크 실험에서 GradNorm의 효과를 입증함.
    - **NYUv2:** Depth, Segmentation, Surface Normals 예측 NYUv2는 회귀와 분류 라벨을 모두 포함하여 GradNorm의 강건성을 테스트하기에 적합함.
    - **MTFL:** 5개 얼굴 랜드마크 및 4개 분류 태스크 MTFL 데이터셋은 분류와 회귀 태스크가 혼합된 풍부한 환경을 제공함.
- **Performance:** 
    - 단일 태스크 모델보다 우수한 성능을 보이며, 특히 오버피팅을 억제하는 정규화 효과가 관찰됨 NYUv2+kpts 데이터셋에서 GradNorm은 훈련 손실이 더 높음에도 불구하고 테스트 에러를 약 5% 개선하며 정규화 효과를 보임.
    - 그리드 서치로 찾은 고정 가중치 모델보다도 뛰어난 성능을 단 한 번의 실행(one-pass)으로 달성함 GradNorm은 단 한 번의 훈련으로 최적의 그리드 서치 가중치를 찾아냄.

---

# 5. 저자 정보 및 계보 (Authors & Genealogy)

- **Advisor/Lab:** Magic Leap 연구진 (Zhao Chen, Vijay Badrinarayanan 등)에 의해 수행됨.
- **Related Work:** 
    - **Kendall et al. (2017):** 불확실성(Uncertainty) 기반 가중치 조절 방식을 제안했으나, GradNorm은 이보다 안정적이고 정규화 효과가 큼 Kendall et al.의 불확실성 가중치 방식보다 GradNorm이 더 안정적이며 성능이 우수함.
- **Follow-up Ideas:** 
    - 태스크가 '학습 불능(stuck)' 상태에 빠졌을 때 가중치가 무한정 커지는 문제 해결 필요 학습이 멈춘 태스크에 가중치가 계속 쏠리는 문제를 온라인으로 감지하고 제거하는 후속 연구가 필요함.
    - Class Imbalance나 Seq-to-Seq 모델 등 그래디언트 충돌이 발생하는 다른 영역으로의 확장성 GradNorm의 접근 방식을 클래스 균형 조정이나 시퀀스 모델로 확장할 가능성이 있음.


