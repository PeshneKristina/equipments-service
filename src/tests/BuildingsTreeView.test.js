import {BuildingsTreeView, getListEquipment} from "../LeftPanel/BuildingsTreeView";
import BuildTree from "../BuildTree/BuildTree";


describe("get list of all equipment for place", () => {

    test('get list of all equipment for place', () => {
        const data = [
            {
                id: 'main',
                name: 'Главный офис',
                parts: ['main-left', 'main-right'],
                equipment: [
                    {id: '87UjBRXSAcjyYptjKuRN', name: 'измененный', count: 12, place: 'main'},
                    {id: 'EIZzvKcW524S3qm0LJp1', name: 'Окно', count: '2', place: 'main'},
                ]
            },
            {
                id: 'main-101',
                name: 'Кабинет 101',
                parts: undefined,
                equipment: [
                    {id: 'E9U5pNBr7mHKRqdxyYoy', name: 'Кукла "Африканский диктатор"', count: '9', place: 'main-101'},
                    {id: 'LcXqUMv5TJEAWk7YfbHd', name: 'Кукольное здание Гаагского суда', count: '1', place: 'main-101'},
                ]
            },
            {
                id: 'main-102',
                name: 'Кабинет 102',
                parts: undefined,
                equipment: [{id: 'At49YCBusk91KxwPaong', name: 'лампа настольная', count: '10', place: 'main-102'}]
            },
            {
                id: 'main-left',
                name: 'Левое крыло',
                parts: ['main-101', 'main-102'],
                equipment: [
                    {id: 'YIN4QE1lOmiCYojwlrPH', name: 'Ручка гелевая', count: 1, place: 'main-left'}
                ]
            },
            {
                id: 'main-right',
                name: 'Правое крыло',
                parts: ['main-head'],
                equipment: undefined
            },

        ]
        let exp = [
            {
                "count": 12,
                "id": "87UjBRXSAcjyYptjKuRN",
                "name": "измененный",
                "place": "main"
            },
            {
                "count": "2",
                "id": "EIZzvKcW524S3qm0LJp1",
                "name": "Окно",
                "place": "main"
            },
            {
                "count": 1,
                "id": "YIN4QE1lOmiCYojwlrPH",
                "name": "Ручка гелевая",
                "place": "main-left"
            },
            {
                "count": "9",
                "id": "E9U5pNBr7mHKRqdxyYoy",
                "name": "Кукла \"Африканский диктатор\"",
                "place": "main-101"
            },
            {
                "count": "1",
                "id": "LcXqUMv5TJEAWk7YfbHd",
                "name": "Кукольное здание Гаагского суда",
                "place": "main-101"
            },
            {
                "count": "10",
                "id": "At49YCBusk91KxwPaong",
                "name": "лампа настольная",
                "place": "main-102"
            }
        ]
        expect(getListEquipment(BuildTree(data)[0])).toEqual(exp);
    });
    test('get list of all equipment for []', () => {
        let data = [];
        let exp = [];
        expect(getListEquipment(BuildTree(data)[0])).toEqual(exp);
    })
})