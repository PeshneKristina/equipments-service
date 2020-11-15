import React from "react";
import './index.scss';

//import DataLoader from "./data/DataLoader.js";
import buildTree from "./data/BuildTree.js";
import renderLeftPanel from "./LeftPanel/renderLeftPanel";

let data = [
    {
        id: 'main',
        name: 'Главный офис',
        parts: [ 'main-left', 'main-right' ],
        equipment: [
            {
                id: '87UjBRXSAcjyYptjKuRN',
                name: 'измененный',
                count: 12,
                place: 'main'
            },
            {
                id: 'EIZzvKcW524S3qm0LJp1',
                name: 'Окно',
                count: '2',
                place: 'main'
            },
            {
                id: 'h35Afso2T2IXLxD9dLrT',
                name: 'Шкаф',
                count: '2',
                place: 'main'
            }
        ]
    },
    {
        id: 'main-101',
        name: 'Кабинет 101',
        parts: undefined,
        equipment: [
            {
                id: 'E9U5pNBr7mHKRqdxyYoy',
                name: 'Кукла "Африканский диктатор"',
                count: '9',
                place: 'main-101'
            },
            {
                id: 'LcXqUMv5TJEAWk7YfbHd',
                name: 'Кукольное здание Гаагского суда',
                count: '1',
                place: 'main-101'
            },
            {
                id: 'Q4XZbI5qICJk6lhLApm6',
                name: 'Кружка',
                count: '12',
                place: 'main-101'
            },
            {
                id: 'aGdXTwGyLJiRcnI5AwDb',
                name: 'Кофемашина',
                count: '1',
                place: 'main-101'
            }
        ]
    },
    {
        id: 'main-102',
        name: 'Кабинет 102',
        parts: undefined,
        equipment: [{
            id: 'At49YCBusk91KxwPaong',
            name: 'лампа настольная',
            count: '10',
            place: 'main-102'
        }]
    },
    {
        id: 'main-head',
        name: 'Кабинет руководителя',
        parts: undefined,
        equipment:[
            {
                id: 'YFXeMsWh4SzEP7pLjpwx',
                name: 'Кресло',
                count: '-1',
                place: 'main-head'
            }
        ]

    },
    {
        id: 'main-left',
        name: 'Левое крыло',
        parts: [ 'main-101', 'main-102' ],
        equipment: [
            {
                id: 'YIN4QE1lOmiCYojwlrPH',
                name: 'Ручка гелевая',
                count: 1,
                place: 'main-left'
            }
        ]
    },
    {
        id: 'main-right',
        name: 'Правое крыло',
        parts: [ 'main-head' ],
        equipment: undefined
    },
    {
        id: 'production',
        name: 'Производственный комплекс',
        parts: [ 'production-1', 'production-2' ],
        equipment: [
            {
                id: '5Y3KqGCX87GzthcGx0XG',
                name: 'Стул',
                count: '4',
                place: 'production'
            },
            {
                id: 'E5zcw4UrmrI6gRejWgTe',
                name: 'Стол',
                count: '2',
                place: 'production'
            },
            {
                id: 'Slguwzc9L8muV3ZSskUl',
                name: 'Проектор',
                count: '1',
                place: 'production'
            },
            {
                id: 'fpe2ff2EJZBoy6PbYw6H',
                name: 'Диван',
                count: '1',
                place: 'production'
            }
        ]
    },
    {
        id: 'production-1',
        name: 'Цех предварительной обработки сырьевого материала',
        parts: undefined,
        equipment: undefined
    },
    {
        id: 'production-2',
        name: 'Производственный цех',
        parts: undefined,
        equipment: [
            {
                id: 'UF5LWpeBIBYWCafsKL1c',
                name: 'печатный станок',
                count: 1,
                place: 'production-2'
            }
        ]
    }
]


//let dataLoader = new DataLoader();
//console.log("hello");
//dataLoader.loadData().then(console.log);

//dataLoader.loadData()
//     .then(data =>renderLeftPanel(buildTree(data)));

renderLeftPanel(buildTree(data))
