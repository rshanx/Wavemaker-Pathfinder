import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topicfilter'
})
export class TopicfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.TopicTitle.toLowerCase().includes(searchText);
    });
  }

}
