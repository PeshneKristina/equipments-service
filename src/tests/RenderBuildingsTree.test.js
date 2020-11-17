import {addInventoryToPlaces} from "../LeftPanel/RenderBuildingsTree"


describe("add inventories to place", () => {
    test('add some inventories to some place', () => {
        let places = [
            {id: "main-1", name: "main-1", parts: ["main-11", "main-12"]},
            {id: "main-11", name: "main-11", parts: ["main-111"]},
            {id: "main-2", name: "main-2", parts: undefined},
            {id: "main-12", name: "main-12", parts: undefined},
            {id: "main-111", name: "main-111", parts: undefined}
        ];

        let inventories = [
            {id: "shfjb12", name: "inv-1", count: 2, place: "main-1"},
            {id: "dsljsfl", name: "inv-2", count: 10, place: "main-111"},

        ];
        let exp = [{
            "equipment": [{"count": 2, "id": "shfjb12", "name": "inv-1", "place": "main-1"}],
            "id": "main-1",
            "name": "main-1",
            "parts": ["main-11", "main-12"]
        }, {"equipment": undefined, "id": "main-11", "name": "main-11", "parts": ["main-111"]}, {
            "equipment": undefined,
            "id": "main-2",
            "name": "main-2",
            "parts": undefined
        }, {"equipment": undefined, "id": "main-12", "name": "main-12", "parts": undefined}, {
            "equipment": [{
                "count": 10,
                "id": "dsljsfl",
                "name": "inv-2",
                "place": "main-111"
            }], "id": "main-111", "name": "main-111", "parts": undefined
        }]


        expect(addInventoryToPlaces(places, inventories)).toEqual(exp);
    });
    test('add empty inventories to place', () => {
        let places = [
            {id: "main-1", name: "main-1", parts: ["main-11", "main-12"]},
            {id: "main-11", name: "main-12", parts: undefined},
            {id: "main-12", name: "main-12", parts: undefined}]
        let inventories = []
        let exp = [
            {
                "id": "main-1",
                "name": "main-1",
                "parts": [
                    "main-11",
                    "main-12"
                ],
                "equipment": undefined
            },
            {
                "id": "main-11",
                "name": "main-12",
                "parts": undefined,
                "equipment": undefined
            },
            {
                "id": "main-12",
                "name": "main-12",
                "parts": undefined,
                "equipment": undefined
            }
        ]
        expect(addInventoryToPlaces(places, inventories)).toEqual(exp);
    });
    test('add  inventories to empty place', () => {
        let inventories = [
            {id: "shfjb12", name: "inv-1", count: 2, place: "main-1"},
            {id: "dsljsfl", name: "inv-2", count: 10, place: "main-111"},

        ];
        let places = [];
        let exp = []
        expect(addInventoryToPlaces(places, inventories)).toEqual(exp);
    });

});




