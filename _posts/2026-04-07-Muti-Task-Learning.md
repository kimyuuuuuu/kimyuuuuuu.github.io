---
title: "Multi-Task Learning와 Gradient Conflict"
date: 2026-04-07
categories: [Multi-Task-Learning]
math: true
---

# 1. Multi-Task Learning ?
- 하나의 모델로 여러 Task를 동시에 학습하여 **관련 있는 task 간 representation을 공유하여** 성능을 향상시키는 학습 패러다임
    - e.g.) 차선 인식 + 장애물 감지 + 속도 제어 동시 학습 

- Single-Task Learning: $\min_{\theta} \mathcal{L}_1(\theta)$
- Multi-Task Learning: $\min_{\theta} \sum_{i=1}^{T} \lambda_i \mathcal{L}_i(\theta)$
-  $\theta$는 (shared) parameter, $\lambda_i$는 각 task의 가중치.

- **representation 공유?**
    - MTL: model architecture (backbone neurons)를 공유
    - JEPA: embedding vector space를 공유

- Transfer Learning, Multi-Label Learning, Multi-View Learning  
    ![MTL compare](/assets/img/MTL_compare.png)    
    - Transfer Learning: Source task의 도움을 받아 target task의 성능 향상 
        - vs MTL: 모든 Task의 일반화 성능을 동시에 향상

    - Multi-Label Learning: 하나의 데이터 샘플(Data)이 여러 개의 레이블(Label 1 ~ m)을 동시에 가짐.
        - vs MTL: 각 태스크(Task 1 ~ m)가 서로 다른 데이터셋(Data 1 ~ m)을 가질 수 있음.

    - Multi-View Learning: 하나의 태스크를 해결하기 위해 동일한 데이터에 대한 여러 특징들(예: 이미지와 텍스트 설명)을 결합하여 학습
        - vs MTL: 여러 개의 태스크를 수행하며, 각 태스크는 독립적인 데이터와 목적을 가짐.

- MTL 종류 
    - Representation Sharing 
        - feature MTL : shared feature representation 명시적으로 설계 
            - Homogeneous: trainig set이 같은 feature space에 놓여 있음 
            - Heterogeneous: trainig set이 다른 feature space에 놓여 있음 (=다른 Input 차원/특성)
        - MTL : 공유 구조가 implicit하거나 명시하지 않음 
    
    - Learning Paradigm (Task 학습 방식)
        - Homogeneous: 모든 task가 같은 방식 (e.g., 모두 classification)
        - Heterogeneous: task들이 다른 방식 (e.g., classification + regression)


# 2. Shared vs Specific Representation

MTL의 핵심 설계 질문: **"어디까지 공유하고, 어디서 갈라질 것인가?"**

```
입력 데이터
    │
    ▼
┌─────────────────────┐
│   Shared Encoder    │  ← 모든 task가 공통으로 사용
│  (공통 표현 학습)    │
└─────────────────────┘
    │
    ├──────────────────────────────┐
    ▼                              ▼
┌──────────────┐         ┌──────────────┐
│  Task 1 Head │         │  Task 2 Head │
│ (task-specific│         │(task-specific│
│  분류기)     │         │  분류기)     │
└──────────────┘         └──────────────┘
    │                              │
    ▼                              ▼
 Loss 1                         Loss 2
```
- 일반적인 공유 대상: feature, instance, parameter 
    - feature: 여러 task가 같은 intermediate representation을 공유
    - instance: 여러 task가 같은 데이터셋/샘플을 활용
        ```
        Task 1: 데이터 {A, B, C, D}
        Task 2: 데이터 {B, C, D, E}
        ↑ B, C, D를 공유 ↑
        ```
    - parameter: 여러 task가 같은 모델 파라미터를 공유

## Parameter sharing 
### Hard Parameter Sharing (가장 흔한 방식)
![hard param share](/assets/img/hard_param_share.png)   
- Shared encoder: 완전히 공유된 파라미터
- Task-specific head: 각 task만의 파라미터
- 장점: 파라미터 적음, 구현 쉬움
- 단점: shared encoder가 모든 task에 맞춰야 해서 conflict 발생 가능

### Soft Parameter Sharing
![soft param share](/assets/img/soft_param_share.png)   
- 각 task가 독립적인 모델을 가지되, 파라미터가 비슷해지도록 regularization
- task간 파라미터 차이에 L2 페널티
- 더 유연하지만 파라미터 많아짐

### Cross-stitch Networks
- task별 레이어가 있지만, 레이어 사이에서 선택적으로 정보를 교환
- 얼마나 공유할지를 학습으로 결정

# 3. Loss 합산 방식의 문제점
## 가장 단순한 MTL: Loss 그냥 더하기

```python
total_loss = lambda1 * loss_task1 + lambda2 * loss_task2
total_loss.backward()
optimizer.step()
```

### 문제 1: 스케일 불균형

Task 1의 loss가 10.0이고 Task 2의 loss가 0.01이라면?
- 사실상 Task 1만 학습하는 것과 다름없음
- Task 2는 거의 무시됨

### 문제 2: 학습 속도 불균형

Task 1이 빨리 수렴(loss가 금방 낮아짐)하고, Task 2는 느리게 수렴한다면?
- 초반에는 Task 1 위주로 학습
- Task 2가 아직 많이 남았는데 shared 파라미터가 이미 Task 1에 맞춰져 버림
- Task 2를 배우려 하면 Task 1 성능이 떨어짐

### 문제 3: Gradient Conflict
- 두 gradient 벡터가 "서로 반대 **방향**을 가리킬 때" gradient conflict 발생
    - 두 task의 gradient 방향이 정반대라면?
    - 한 task를 개선하는 방향이 다른 task를 악화시킴
    - 단순 합산은 이 충돌을 무시하고 평균 방향으로 이동
    - 어느 task도 제대로 개선 못 함

- Conflict는 방향의 문제이므로, task gradient($g_1$, $g_2$)의 cosine similarity 계산 
    - $\cos(\theta) = \frac{g_1 \cdot g_2}{\|g_1\| \cdot \|g_2\|}$
        - $\cos(\theta) > 0$: 두 gradient가 대략 같은 방향 → 협력(cooperative)
        - $\cos(\theta) = 0$: 두 gradient가 수직 → 중립
        - $\cos(\theta) < 0$: 두 gradient가 반대 방향 → **gradient conflict!**

- gradient의 크기는 "얼마나 빠르게 이동할지"
- gradient의 방향은 "어느 쪽으로 이동할지"

```
Task 1의 gradient: →→→ (오른쪽)
Task 2의 gradient: ←←← (왼쪽)
합산 gradient:      →   (약한 오른쪽, 실제론 0에 가까움)
```

### 문제 4: Lambda 튜닝의 어려움

$\lambda_1$, $\lambda_2$를 어떻게 정할 것인가?

- 실험적으로 찾아야 함: grid search는 task 수가 늘면 exponential하게 복잡
- 데이터셋마다 다름: 한 데이터셋에서 찾은 $\lambda$가 다른 데이터셋엔 안 맞음
- 학습 중 최적값이 변함: 초반과 후반에 필요한 $\lambda$가 다를 수 있음

