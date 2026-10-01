/* 使用者提供的實機截圖是教學唯一畫面依據；每一張圖各自對應一段不可省略的操作。 */
(() => {
  const A = `${document.body.dataset.guideAssets || '../../assets'}/tutorial-screenshots/`;
  /*
   * 座標是以每一張「原始完整截圖」的百分比記錄。說明框永遠放在圖的
   * 外圍，紅點只貼近目標邊緣；因此不會以文字或圓點蓋住操作按鍵。
   */
  const target = (side, top, x, y, startX, startY, left) => ({ side, top, x, y, startX, startY, left });
  const clientProfileTargets = [
    target('top', '-120px', 27.4, 19.5, 27.4, -2, 27.4),
    target('left', 33, 61.2, 27.2, -2, 42),
    target('right', 28, 68.2, 27.2, 102, 38),
    target('left', 70, 17.2, 51.5, -2, 78)
  ];
  const clientSearchTargets = [
    target('top', '-120px', 33.7, 17.0, 33.7, -2, 33.7),
    target('left', 42, 21.2, 55.2, -2, 52),
    target('right', 24, 90.5, 16.2, 102, 34)
  ];
  const businessCardTargets = [
    target('top', '-120px', 24.2, 59.2, 24.2, -2, 24.2),
    target('right', 25, 73.4, 35.0, 102, 35),
    target('right', 57, 73.4, 59.0, 102, 64),
    target('left', 71, 16.7, 81.1, -2, 78)
  ];
  const clientPrintTargets = [
    target('top', '-120px', 8.0, 18.9, 8.0, -2, 17),
    target('left', 31, 8.0, 18.9, -2, 42),
    target('left', 62, 34.8, 18.9, -2, 73),
    target('right', 18, 91.5, 10.0, 102, 29)
  ];
  const fallbackTargets = (count) => [
    target('top', '-120px', 50, 16, 50, -2, 50),
    target('left', 40, 22, 45, -2, 48),
    target('right', 30, 78, 38, 102, 40),
    target('left', 72, 25, 76, -2, 78),
    target('right', 70, 78, 76, 102, 78)
  ].slice(0, count);
  const stage = (image, title, steps, targets) => ({ image, title, steps, targets: targets || fallbackTargets(steps.length) });
  const lessons = {
    'client-profile': [
      stage('客戶基本資料.png', '建立或切換目前客戶', ['先查看頁面上方「目前客戶」名稱；確認不是其他案件。', '需要新案件時，按上方「新增客戶」，輸入可辨識的姓名後確認。', '既有案件則使用客戶搜尋或名單選取，不要以重複新增方式覆蓋舊資料。', '完成切換後，再開始填寫下方欄位。'], clientProfileTargets),
      stage('客戶搜尋.png', '搜尋既有客戶', ['在搜尋欄輸入姓名或已知關鍵字，等待結果更新。', '逐筆核對姓名與畫面顯示的案件資訊，避免同名誤選。', '點選正確結果開啟客戶；切換完成前不要在表單直接修改資料。'], clientSearchTargets),
      stage('名片辨識建檔.png', '由名片建立欄位草稿', ['按名片辨識功能後選取清楚、完整的名片影像。', '逐一核對姓名、公司、電話與 Email 的辨識文字。', '有誤字、缺字或不確定資料時直接修正或留白。', '確認後才寫入客戶基本資料，並按儲存。'], businessCardTargets),
      stage('列印客戶基本資料.png', '列印或另存客戶基本資料', ['先確認上方目前客戶正確，再開啟列印視窗。', '在「列印對象與排序」選擇目前客戶、單一客戶或全部名單。', '需要時展開「客戶基本資料欄位」勾選欄位；展開「欄位寬度調整」微調版面。', '按更新預覽確認資料後，再選列印或另存 PDF。'], clientPrintTargets)
    ],
    'client-profile-search': [stage('客戶搜尋.png', '從結果中選擇正確客戶', ['輸入姓名關鍵字。', '核對結果中的姓名與案件資訊。', '點選正確客戶後，確認頁首目前客戶已更新。'], clientSearchTargets)],
    'client-profile-new': [stage('客戶基本資料.png', '新增客戶並建立底稿', ['先確認目前沒有在編輯其他客戶。', '按「新增客戶」並輸入姓名；同名時先搜尋既有客戶。', '完成基本欄位後按儲存，確認頁首目前客戶已切換。'])],
    'business-card-scan': [stage('名片辨識建檔.png', '辨識、校對、寫入', ['選擇清晰名片影像。', '逐欄校對辨識結果；不確定的欄位不要猜測。', '確認寫入後回到基本資料頁儲存。'], businessCardTargets)],
    'client-service-history': [stage('客戶搜尋.png', '先選客戶再查看服務紀錄', ['先使用搜尋或客戶名單選擇正確案件。', '確認頁首目前客戶已更新後，再開啟服務紀錄。', '依日期與內容閱讀紀錄；需要補正時回基本資料頁修改後儲存。'], clientSearchTargets)],
    'family': [stage('繼承圖.png', '建立主繼承圖', ['先在頂端確認目前客戶。', '由中心人物開始設定被繼承人，再依實際關係加入配偶、父母與子女。', '逐一核對存歿、婚姻與親屬關係；不確定的關係先保留待確認。', '查看畫面產生的順位與分配提示，再進入下一項試算。'])],
    'inheritance-order': [stage('繼承圖.png', '由圖面核對繼承順位', ['先完成主繼承圖上的人物與關係。', '查看各人物節點與連線，確認沒有遺漏前順位親屬。', '對照系統順位提示；有收養、代位或拋棄情形時標記為待專業覆核。'])],
    'deduction': [
      stage('扣除額.png', '填寫扣除額前提', ['先確認主繼承圖與目前客戶一致。', '依畫面分區填入配偶、直系親屬、扶養及其他事實條件。', '每個條件只在有文件或明確事實時勾選。']),
      stage('遺產扣除額分析畫面.png', '檢查扣除額分析結果', ['按計算或更新後閱讀各扣除項目。', '逐項查看系統提示的適用條件與待備文件。', '將不確定項目保留為待確認，勿直接當成申報額度。'])
    ],
    'estate-tax': [stage('遺產稅計算.png', '輸入遺產並檢視稅額', ['選擇遺產或贈與情境與適用年度。', '按資產類別輸入金額，並另列可扣除負債或費用。', '執行計算後核對稅基、扣除額與估算稅額。', '結果僅供規劃；申報前仍須以文件與最新規定覆核。'])],
    'asset-distribution-tax': [
      stage('規劃後財產重分佈圖.png', '設定家庭分配基礎', ['確認帶入的目前客戶與遺產資料。', '依家人、資產類型與分配偏好建立情境。', '先看規劃後分布是否符合家庭意圖，再看稅負。']),
      stage('家人實得初步分配.png', '核對每位家人實得', ['逐列核對受分配人、分配金額與比例。', '若有應保留資產或指定分配，回到設定區修改後重算。', '不要只看合計；每一位家人的結果都要檢查。']),
      stage('7 個可行策略的稅負與淨得比較.png', '比較可行策略', ['選擇同一筆資料下的策略比較表。', '先比較稅負，再比較家人淨得與非金錢限制。', '圈選要進一步討論的策略，不要直接把最低稅額視為唯一答案。']),
      stage('推薦方案計算明細.png', '檢查推薦方案的計算明細', ['開啟推薦方案明細。', '依序核對輸入假設、扣除項目與每一段計算。', '有任一假設不符時，回到來源頁修改後重新比較。']),
      stage('夫妻剩餘財產差額分配請求權專業試算.png', '檢視夫妻剩餘財產差額', ['輸入或確認雙方婚後財產與債務資料。', '確認計算基準日與財產歸屬。', '將結果當作討論底稿，涉及實際權利時由專業人士覆核。'])
    ],
    'commercial-insurance': [
      stage('保險基本資料.png', '先建立保單基本資料', ['輸入保單名稱、保額、期間及必要基本資訊。', '確認資料屬於目前客戶案件。', '先儲存，再進入角色與稅務分析。']),
      stage('保單角色關係圖.png', '設定保單角色', ['分別選擇要保人、被保人與受益人。', '填寫實際保費付款來源，不要以推測代替事實。', '檢查圖上的角色連線是否符合保單及付款紀錄。']),
      stage('商頁保險.png', '確認商業保險案件全貌', ['先確認目前客戶與保單基本資料。', '依畫面檢查保單金額、角色與付款資訊是否已填齊。', '缺少契約或付款證明時，先列為待補資料。']),
      stage('商業保險稅法分析.png', '執行商業保險稅務分析', ['確認角色關係與付款來源已完成。', '選擇案件所需的稅務分析條件。', '閱讀結果中的風險提示與待補文件，而非只看單一數字。']),
      stage('稅務引擎、特殊案例與壓力測試.png', '檢查特殊情境與壓力測試', ['開啟特殊案例或壓力測試區。', '一次只變更一項假設，例如受益人、付款來源或保額。', '比較變更前後結果，保留需由契約或付款證明確認的項目。']),
      stage('稅務判讀表與 AI 輔助判讀.png', '閱讀稅務判讀表', ['先閱讀各項判讀依據與風險提示。', '確認 AI 輔助內容是否與實際保單、付款與關係資料一致。', '將需要人工確認的項目帶回資料頁補正，再重新判讀。'])
    ],
    'disability-grades': [stage('社會保險殘障等級分析.png', '比對殘障等級條件', ['選擇適用的社會保險制度。', '依診斷、失能部位與文件資料選擇對應條件。', '閱讀各級距提示與所需資料。', '最終等級仍以主管機關或鑑定結果為準。']), stage('社會保險.png', '整理制度資料', ['核對制度別與被保險人身分。', '確認投保、年資或給付條件的來源。', '將本頁作為資料整理，不當成核定結果。'])],
    'retirement-pension': [stage('退休生活風險規劃.png', '設定退休規劃條件', ['確認目前客戶與退休目標。', '輸入年齡、年資、收入與預計退休時間。', '先閱讀生活風險缺口，再進入年金比較。']), stage('退休年金比較.png', '比較退休年金情境', ['選擇適用制度。', '分別查看提前、正常與延後請領情境。', '核對月領、累計與假設條件後再決定要深入的方案。'])],
    'retirement-labor-scenario': [stage('退休年金比較.png', '勞保請領年齡比較', ['在退休年金頁選擇勞保相關情境。', '調整預計請領年齡並確認年資與薪資基礎。', '比較每種年齡的月領與累計結果。'])],
    'retirement-pension-schedule': [stage('退休年金比較.png', '退休累計與交叉點比較', ['保留同一組年資及請領條件。', '選擇要比較的請領時點。', '查看累計曲線與交叉點，並確認它是估算而非保證。'])],
    'loan-analysis': [
      stage('專業貸款分析.png', '輸入貸款基本條件', ['填入本金、年利率、期數與還款方式。', '將開辦費、違約金或其他成本分開填列。', '按計算後先確認月付與總成本。']),
      stage('原一般房貸方案.png', '確認原方案', ['輸入既有貸款的剩餘本金、利率與期限。', '核對是否包含提前清償或轉貸成本。', '保存為比較基準。']),
      stage('新方案還款圖表.png', '閱讀新方案還款圖表', ['輸入新方案的條件。', '比較每期還款、利息與本金變化。', '確認圖表期間與原方案一致。']),
      stage('方案比較結果.png', '比較並選擇方案', ['將原方案與新方案放在同一比較表。', '依月付、總利息、一次性費用與現金流逐項比較。', '選定方向前向銀行確認實際核貸與費率。'])
    ],
    'land-exchange': [
      stage('土地交易與稅務分析.png', '設定土地交易基本資料', ['先確認目前客戶及要分析的土地案件。', '輸入土地、房屋、公告現值與交易金額；依頁面單位填寫。', '確認取得日、移轉日與持有期間，再儲存。']),
      stage('取得、移轉類型與時間.png', '指定取得與移轉類型', ['選擇原始取得原因及本次移轉方式。', '輸入取得、移轉與預計出售日期。', '確認日期順序正確，因為它會影響持有期間與稅制判讀。']),
      stage('買賣、贈與與繼承比較.png', '比較三種移轉方式', ['在相同資產條件下選擇買賣、贈與與繼承比較。', '確認每個情境使用相同的價值與費用假設。', '先看本次成本，再看日後出售影響。']),
      stage('稅率、稅基與其他費用.png', '核對稅基與費用', ['逐項輸入或確認稅基、稅率與代書、登記等費用。', '不確定的法定稅率不要自行猜測，標記待確認。', '更新後重新計算。']),
      stage('稅務比較總覽.png', '查看稅務比較總覽', ['閱讀每種方式的本次稅費與合計。', '核對比較表是否使用同一時點與同一資產範圍。', '選出需要檢視明細的方式。']),
      stage('父母子女移轉概略比較.png', '比較父母子女移轉', ['確認親屬關係與移轉目的。', '比較贈與、真實買賣與繼承的概略成本。', '將「概略」結果當討論起點，不作為契約或申報結論。']),
      stage('父子移轉財產.png', '整理父子女移轉財產', ['逐項確認欲移轉的土地、房屋或其他財產。', '確認每項資產的所有權、價值與取得資料。', '同一案件中不要把不同標的的成本或日期混填。']),
      stage('父子女真實買賣：移轉流程.png', '檢查真實買賣流程', ['確認交易價格、金流與契約可被證明。', '依流程逐步核對簽約、付款、申報與登記。', '缺少實質交易證明時，不要將案件標示為真實買賣。']),
      stage('若下一代在不同持有期間出售.png', '比較下一代日後出售', ['設定下一代預計出售的日期與價格。', '逐一切換不同持有期間。', '比較各期間的稅費與淨得，注意長期持有假設。']),
      stage('持有比較.png', '確認不同持有期間的差異', ['選擇要比較的持有年數。', '核對每個年數下使用的是同一出售價格與成本。', '閱讀差異時，將稅負、淨得與時間成本一併比較。']),
      stage('持有期間 × 移轉方式：稅費與 ROI 矩陣.png', '閱讀持有期間矩陣', ['選擇要比較的移轉方式與持有期間。', '由同一列或同一欄比較，避免交叉讀錯。', '將 ROI 與稅費一起看，不只依單一比例決定。']),
      stage('贈與 vs 買賣稅負最佳化分析.png', '進行贈與與買賣最佳化比較', ['確認兩種情境的價格、成本與日期皆完整。', '檢視稅負差異與敏感參數。', '任何一項基礎資料變動後都需重新計算。'])
    ],
    'report-center': [stage('報表列印.png', '選擇、預覽與列印報表', ['確認目前客戶與要納入的功能頁。', '選擇報表內容後先更新預覽。', '逐頁核對姓名、日期、金額與敏感資料。', '確認無誤才列印或另存 PDF。'])],
    'laws': [stage('遺產及贈與稅法條文.png', '查閱法規條文', ['先依主題選擇要查的法規範圍。', '閱讀條文與系統整理提示。', '對外引用、申報或簽約前，回到主管機關來源核對施行版本與日期。'])],
    'backup-restore': [stage('資料備份總覽.png', '建立與還原資料備份', ['在重要修改前先建立完整備份並保存到受保護位置。', '還原前先選取備份檔並確認預覽中的客戶筆數與名稱。', '確認來源正確後才執行還原；不確定時先停止並保留原檔。'])]
    , 'email-automation': [stage('入口頁.png', '由入口進入電子郵件自動化', ['先在入口頁確認目前客戶與工作目標。', '點選電子郵件自動化功能卡後，依首次設定指引完成寄件帳號設定。', '先寄測試信並人工核對收件人與內容；確認後才建立範本或排程。'])]
    , 'commercial-control': [stage('資料備份總覽.png', '管理主控版的資料保護操作', ['確認目前使用的是管理主控版，而非客戶版。', '先閱讀資料保護與備份狀態，不要直接執行清除或還原。', '需要設備或授權管理時，依內部核對流程處理並保留操作紀錄。'])]
  };

  const pageId = document.body.dataset.lesson;
  const article = document.querySelector(`.lesson-page-list article[id="${pageId}"]`);
  const stages = lessons[pageId];
  if (!article || !stages?.length) return;

  article.querySelectorAll('.guide-figure, .guide-image-callouts, .guide-target-dot, .guide-leaders').forEach((node) => node.remove());
  const host = document.createElement('section');
  host.className = 'lesson-stage-list';
  host.setAttribute('aria-label', '逐圖操作步驟');
  stages.forEach((entry, index) => {
    const section = document.createElement('section');
    section.className = 'lesson-stage';
    section.innerHTML = `<h4>畫面 ${index + 1}：${entry.title}</h4>`;

    const figure = document.createElement('figure');
    figure.className = 'guide-figure lesson-stage-figure';
    figure.innerHTML = `<img src="${A}${entry.image}" alt="${entry.title}的操作畫面" loading="lazy">`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'guide-leaders');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    figure.append(svg);

    const callouts = document.createElement('ol');
    callouts.className = 'guide-image-callouts lesson-image-callouts';
    entry.steps.forEach((text, stepIndex) => {
      const point = entry.targets[stepIndex];
      if (!point) return;
      const callout = document.createElement('li');
      callout.className = 'guide-image-callout';
      callout.dataset.side = point.side;
      callout.style.setProperty('--callout-top', typeof point.top === 'number' ? `${point.top}%` : point.top);
      if (point.left != null) callout.style.setProperty('--callout-left', `${point.left}%`);
      callout.innerHTML = `<b>${stepIndex + 1}</b><span></span>`;
      callout.querySelector('span').textContent = text;
      callouts.append(callout);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(point.startX));
      line.setAttribute('y1', String(point.startY));
      line.setAttribute('x2', String(point.x));
      line.setAttribute('y2', String(point.y));
      svg.append(line);

      const dot = document.createElement('span');
      dot.className = 'guide-target-dot';
      dot.style.setProperty('--target-x', `${point.x}%`);
      dot.style.setProperty('--target-y', `${point.y}%`);
      figure.append(dot);
    });
    figure.append(callouts);
    const caption = document.createElement('figcaption');
    caption.textContent = '依紅點所指目標逐項操作；說明框與紅點均設在按鍵、欄位文字之外。';
    figure.append(caption);
    section.append(figure);
    host.append(section);
  });
  article.querySelector('dl')?.insertAdjacentElement('beforebegin', host);
})();
