import { Component, OnInit } from '@angular/core';

export interface WeaponElement {
  name: string;
  damage: string;
  specifics: string;
  properties: string;
  characteristic: string;
}
export interface ArmourElement {
  name: string;
  class: string;
  specifics: string;
  providing: string;
  sneak: string;
}


const WEAPON_DATA: WeaponElement[] = [
  { name: 'Кинджал', damage: '1d4 колюча', specifics: 'Бонус +3 до атаки зі спини, можна метати(без бонусу)', properties: 'Легка зброя', characteristic: 'Спритність' },
  { name: 'Меч', damage: '1d6 рубляча/колюча', specifics: '', properties: 'Легка зброя', characteristic: 'Сила/Спритність' },
  { name: 'Молот(Булава)', damage: '1d6 дробляча/колюча', specifics: '', properties: 'Легка зброя', characteristic: 'Сила' },
  { name: 'Сокира', damage: '1d6 рубляча', specifics: '', properties: 'Легка зброя', characteristic: 'Сила/Спритність' },
  { name: 'Спис', damage: '1d6 колюча', specifics: 'Можна метати', properties: 'Легка зброя', characteristic: 'Спритність' },
  { name: 'Посох', damage: '1d4 дробляча', specifics: 'Бонус до магічної атаки +1', properties: 'Важка зброя', characteristic: 'Сила/Спритність' }
];
const RANGE_WEAPON_DATA: WeaponElement[] = [
  { name: 'Легкий арбалет', damage: '1d8 Дробляча/Колюча', specifics: 'Перезарядка - основна дія', properties: 'Важка зброя', characteristic: 'Спритність' },
  { name: 'Короткий лук', damage: '1d6 Колюча', specifics: 'Перезарядка - бонусна дія', properties: 'Важка зброя', characteristic: 'Спритність' }
]
const WARRIOR_WEAPON_DATA: WeaponElement[] = [
  { name: 'Бойовий молот(булава)', damage: '1d8 дробляча/колюча', specifics: 'Бонус +1 до атаки важких обладунків', properties: 'Універсальна зброя (1d10)', characteristic: 'Сила' },
  { name: 'Бойова сокира', damage: '1d8 рубляча', specifics: 'Бонус +1 до атаки легких та середніх обладунків', properties: 'Універсальна зброя (1d10)', characteristic: 'Сила/Спритність' },
  { name: 'Довгий меч', damage: '1d8 рубляча', specifics: 'Бонус +2 до атаки в бою з 1 супротивником', properties: 'Універсальна зброя (1d10)', characteristic: 'Сила/Спритність' },
  { name: 'Дворучний молот(булава)', damage: '2d6 дробляча', specifics: 'Бонус +2 до атаки важких обладунків', properties: 'Важка зброя', characteristic: 'Сила' },
  { name: 'Дворучна сокира', damage: '2d6 рубляча', specifics: 'Бонус +2 до атаки легких та середніх обладунків', properties: 'Важка зброя', characteristic: 'Сила' },
  { name: 'Дворучний меч', damage: '2d6 рубляча/колюча', specifics: 'Бонус +4 до атаки в бою з 1 супротивником', properties: 'Важка зброя', characteristic: 'Сила' },
  { name: 'Алебарда/Глефа', damage: '1d10 рубляча', specifics: 'Бонус +2 шкоди сусіднім ворогам', properties: 'Важка зброя', characteristic: 'Сила' }
];
const WARRIOR_RANGE_WEAPON_DATA: WeaponElement[] = [
  { name: 'Одноручний арбалет', damage: '1d6 Дробляча/Колюча', specifics: 'Займає 1 руку, перезарядка 1 основна дія(Якщо в обох руках - 1 хід)', properties: 'Легка зброя', characteristic: 'Спритність' },
  { name: 'Важкий арбалет', damage: '1d12 Дробляча/Колюча', specifics: 'Перезарядка 1 основна дія, +2 до атаки з вигідної позиції', properties: 'Важка зброя', characteristic: 'Спритність' },
  { name: 'Довгий лук', damage: '1d8 Колюча', specifics: 'Перезарядка 1 додаткова дія, +2 до атаки з вигідної позиції', properties: 'Важка зброя', characteristic: 'Спритність' }
]
const LIGHT_ARMOUR_DATA: ArmourElement[] = [
  { name: 'Тканинні', class: '8 + модифікатор Спр.', specifics: 'Цивільний одяг', providing: '', sneak: 'Бонус на скрадання(грабунок) +2 у населених пунктах' },
  { name: 'Магічні', class: '8 + модифікатор Спр.', specifics: 'Бонус +2 до магічної атаки', providing: 'Інт. 12', sneak: 'Бонус на скрадання(грабунок) +2 у населених пунктах' },
]
const MEDIUM_ARMOUR_DATA: ArmourElement[] = [
  { name: 'Шкіряний', class: '10 + модифікатор Спр.', specifics: 'Бонус +1 до атаки зі спини або зненацька', providing: 'Спр 10', sneak: '' },
  { name: 'Лускатий', class: '12 + модифікатор Спр.', specifics: 'Бонус +1 до атаки одноручною зброєю', providing: 'Сил 12', sneak: 'Перешкода' },
  { name: 'Напівлатний', class: '14 + модифікатор Спр.', specifics: 'Бонус +1 до атаки дворучною зброєю', providing: 'Сил 14', sneak: 'Перешкода' }
]
const HEAVY_ARMOUR_DATA: ArmourElement[] = [
  { name: 'Кольчуга', class: '15 + модифікатор Спр.(не більше 5)', specifics: '', providing: 'Сил. 15', sneak: 'Перешкода' },
  { name: 'Лати', class: '18+ модифікатор Спр.(не більше 4)', specifics: '', providing: 'Сил. 15', sneak: 'Перешкода' },
]
const SHIELDS_ARMOUR_DATA: ArmourElement[] = [
  { name: 'Щит', class: '2', specifics: '', providing: '', sneak: '' },
  { name: 'Баштовий щит', class: '4 + 1/2 модифікатор Стат.', specifics: 'Можливість виконати лише 1 дію за хід(переміщення, удар, зілля). -4 до Спр.', providing: 'Сил. 14', sneak: 'Неможливе у звичайних умовах' },
]


@Component({
  selector: 'app-armoury',
  templateUrl: './armoury.component.html',
  styleUrls: ['./armoury.component.css']
})
export class ArmouryComponent implements OnInit {

  columnsWeapon = [
    {
      columnDef: 'name',
      header: 'Назва',
      cell: (element: WeaponElement) => `${element.name}`
    },
    {
      columnDef: 'damage',
      header: 'Шкода',
      cell: (element: WeaponElement) => `${element.damage}`
    },
    {
      columnDef: 'specifics',
      header: 'Особливості',
      cell: (element: WeaponElement) => `${element.specifics}`
    },
    {
      columnDef: 'properties',
      header: 'Властивості',
      cell: (element: WeaponElement) => `${element.properties}`
    },
    {
      columnDef: 'characteristics',
      header: 'Характеристика',
      cell: (element: WeaponElement) => `${element.characteristic}`
    }
  ];
  columnsArmour = [
    {
      columnDef: 'name',
      header: 'Назва',
      cell: (element: ArmourElement) => `${element.name}`
    },
    {
      columnDef: 'class',
      header: 'Клас броні',
      cell: (element: ArmourElement) => `${element.class}`
    },
    {
      columnDef: 'specifics',
      header: 'Особливості',
      cell: (element: ArmourElement) => `${element.specifics}`
    },
    {
      columnDef: 'providing',
      header: 'Умова',
      cell: (element: ArmourElement) => `${element.providing}`
    },
    {
      columnDef: 'sneak',
      header: 'Скрадання',
      cell: (element: ArmourElement) => `${element.sneak}`
    }
  ];
  weaponDataSource = WEAPON_DATA;
  rangeWeaponDataSource = RANGE_WEAPON_DATA;
  warriorWeaponDataSource = WARRIOR_WEAPON_DATA;
  warriorRangeWeaponDataSource = WARRIOR_RANGE_WEAPON_DATA;
  displayedColumns = this.columnsWeapon.map(c => c.columnDef);

  lightArmourDataSource = LIGHT_ARMOUR_DATA;
  mediumArmourDataSource = MEDIUM_ARMOUR_DATA;
  heavyArmourDataSource = HEAVY_ARMOUR_DATA;
  shieldsArmourDataSource = SHIELDS_ARMOUR_DATA;
  displayedColumnsArmour = this.columnsArmour.map(c => c.columnDef);

  constructor() { }

  ngOnInit(): void {
  }

}
