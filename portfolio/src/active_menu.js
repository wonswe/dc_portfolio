// 구현 계획
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다. (querySelector)
// 2. IntersectionObserver를 사용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당되는 메뉴 아이템을 활성화 시킨다.
// 보여지는 섹션:
// - 다수의 섹션이 동시에 보여진다면, 가장 첫번째 섹션을 선택
// - 마지막 contact 섹션이 보여진다면, 가장 마지막 섹션을 선택

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[href="${id}"]`)
);
const visibleSections = sectionIds.map(() => false);
let activeNavItem = navItems[0];

const options = {
  rootMargin: '-20% 0px 0px 0px',
  threshold: [0, 0.98],
};
const observer = new IntersectionObserver(observerCallback, options);
sections.forEach((section) => observer.observe(section));

function observerCallback(entries) {
  let selectLastOne; // flag 변수
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    selectLastOne =
      index === sectionIds.length - 1 && // 마지막 인덱스이고
      entry.isIntersecting && // 보여지고 있고
      entry.intersectionRatio >= 0.95; // 95% 보여지고 있으면
    // selectLastOne = True, 하나라도 안맞으면 False
  });
  console.log(visibleSections);
  console.log('무조건 라스트 섹션!', selectLastOne);

  const navIndex = selectLastOne
    ? sectionIds.length - 1
    : findFirstIntersecting(visibleSections);
  console.log(sectionIds[navIndex]);
  selectNavItem(navIndex);
}

function findFirstIntersecting(visibleSections) {
  const index = visibleSections.indexOf(true);
  return index >= 0 ? index : 0;
}

function selectNavItem(index) {
  const navItem = navItems[index];
  if (!navItem) return;
  activeNavItem.classList.remove('active');
  activeNavItem = navItem;
  activeNavItem.classList.add('active');
}
