
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'statsTranslation'
})
export class StatsTranslationPipe implements PipeTransform {

  transform(stat: any) {

    const dictionary: any = {
      'str': 'Сила',
      'dex': 'Спритність',
      'con': 'Статура',
      'int': 'Інтелект',
      'wis': 'Мудрість',
      'cha': 'Харизма',

      'acro': 'Акробатика',
      'athl': 'Атлетика',
      'magi': 'Магія',
      'dece': 'Обман',
      'hist': 'Історія',
      'perc': 'Проникливість',
      'inti': 'Залякування',
      'inve': 'Розслідування',
      'medi': 'Медицина',
      'natu': 'Природа',
      'perc1': 'Сприйняття',
      'perf': 'Виступ',
      'conv': 'Переконання',
      'reli': 'Релігія',
      'lege': 'Спритність рук',
      'secr': 'Скрадання',
      'surv': 'Виживання',
      'pett': 'Поводження з тваринами',

    }

    return dictionary[stat] || stat
  }

}
