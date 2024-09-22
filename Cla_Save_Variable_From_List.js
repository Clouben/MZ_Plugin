/*:
 * @target MZ
 * @plugindesc 리스트에서 무작위 상수를 선택해 변수에 저장하는 플러그인입니다.
 * @author 프랑도르
 * @url https://github.com/Clouben/MZ_Plugin/blob/main/Cla_Save_Variable_From_List.js
 *
 * @help 이 플러그인은 플러그인 명령을 통해 작성한 리스트에서 무작위로 리스트 내에 있는 상수를 하나 선택해 지정한 변수에 저장하는 플러그인입니다.
 * 
 * 플러그인 명령을 통해서만 작동하고 있기 때문에 플러그인 관리자에서 이 플러그인을 넣기만 하셔도 플러그인 명령을 통해 사용하실 수 있습니다.
 * 
 * - 이용규약
 * 플러그인 사용 시 크레딧에 적어주시는 것만으로도 충분합니다.
 * 상업/비상업적 게임 개발에 사용가능합니다.
 * 플러그인 제작자에게 사용보고는 하지 않아도 됩니다.
 * 다만 반사회적이나 정치적인 요소, 노골적으로 미풍양속을 해칠 목적으로 만들어진 게임에서는 사용하실 수 없습니다.
 * 
 * @command ListSelect
 * @text 리스트에서 추첨
 * @desc 입력한 리스트에서 무작위로 리스트 내 상수를 선택해 변수에 저장합니다.
 *
 * @arg List
 * @text 리스트
 * @desc 추첨할 상수를 이 리스트 내에 적어주세요.
 * @default []
 * @type struct<List>[]
 *
 * @arg variableId
 * @text 저장할 변수
 * @desc 무작위로 선택된 상수를 저장할 변수입니다.
 * @type variable
 *
 */

/*~struct~List:
 *
 * @param List_Member
 * @text 리스트 상수 이름
 * @desc 추첨될 상수의 이름을 적어주세요.
 * @type string
 *
 */

(() => {

    const pluginName = "Cla_Save_Variable_From_List";

    PluginManager.registerCommand(pluginName, "ListSelect", function(args) {
        console.log("플러그인이 호출되었습니다."); // 디버깅 로그

        // args.List가 문자열로 전달되므로 JSON 파싱하여 배열로 변환
        const parsedList = JSON.parse(args.List);
        console.log("파싱된 리스트: ", parsedList);

        // 각 항목을 다시 파싱하여 객체로 변환
        const listItems = parsedList.map(item => JSON.parse(item));
        console.log("리스트 항목들: ", listItems);

        // 구조체 배열에서 상수 이름 추출
        const itemNames = listItems.map(item => item.List_Member);
        console.log("추출된 항목들: ", itemNames);

        if (itemNames.length === 0) {
            console.error("리스트가 비어 있습니다.");
            return;
        }

        // 무작위로 선택
        const randomIndex = Math.floor(Math.random() * itemNames.length);
        const selectedItem = itemNames[randomIndex];

        // 변수에 저장
        $gameVariables.setValue(args.variableId, selectedItem);
        console.log(`선택된 항목: ${selectedItem}, 변수 ID: ${args.variableId}에 저장되었습니다.`);
    });
})();
