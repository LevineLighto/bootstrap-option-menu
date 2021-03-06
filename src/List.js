import {CreateElement} from "@levinelito/create-html-element";
import {DataFetch} from "./DataFetch.js";
import {DataSend} from "./DataSend.js";

class InstallableList{
    constructor({target, data, dataURL, addURL, removeURL, onAdd, onRemove}) {
        this.target = document.querySelector(target);
        if(this.target.nodeName == "INPUT" || this.target.nodeName == "TEXTAREA"){
            this.targetIsInput = true;
        }

        if(dataURL){
            this.data = DataFetch({
               url      : dataURL,
               onfetched: (data)    => {this.data = data; this.RenderUI()},
               onfail   : (error)   => console.error(error)
            });
        } else if(data){
            this.data = data;
            this._RenderUI();
        } else {
            this.data = {added: [], available: []};
            this._RenderUI();
        }

        if(addURL){ this.addURL = addURL }
        if(removeURL){ this.removeURL = removeURL }
        if(onAdd && typeof onAdd === 'function'){ this.onAdd = onAdd }
        if(onRemove && typeof onRemove === 'function'){ this.onRemove = onRemove }
    }

    _AddItem(event) {
        let value       = event.currentTarget.parentNode.parentNode.parentNode.getAttribute('value'),
            available   = this.data.available,
            added   = this.data.added,
            data;

        if(typeof available[0] === 'object'){
            const values    = available.map(item => item.value),
                index       = values.indexOf(value);

            data = available[index];
            added.push(data);
            available.splice(index, 1);

            if(this.onAdd) this.onAdd(data);
        } else if(typeof available[0] === 'string') {
            available.splice(available.indexOf(value), 1);
            added.push(value);

            if(this.onAdd) this.onAdd(value);
        }

        let element = this.availableList.querySelector(`[value="${value}"]`),
            button  = element.querySelector('button'),
            icon    = button.querySelector('i');

        this.addedList.insertBefore(element, this.CustomInput);
        button.classList.remove('btn-primary');
        icon.classList.remove('fa-plus');
        button.classList.add('btn-danger');
        icon.classList.add('fa-minus');

        if(this.addURL) {
            let data = new FormData;
            data.append('value', value);
            DataSend({
                url         : this.addURL,
                onsuccess   : data  => console.log(data),
                onfail      : error => console.error(error),
                options     : {
                    method  : 'POST',
                    headers : {
                        'X-Requested-With'  : 'XMLHttpRequest',
                        'X-CSRF-TOKEN'      : document.querySelector('meta[name="_token"]').getAttribute('content')
                    },
                    body    : data
                }
            });
        }
    }

    _CreateCustomItem() {
        let content = (this.DataIsObject ? `
        <form>
            <label for="label">Nama</label>
            <input type="text" name="label" class="form-control"/>
            <label for="value">Nilai</label>
            <input type="text" name="value" class="form-control"/>
            <input type="submit" value="Tambah" class="btn btn-primary"/>
        </form>
        ` : `
        <form>
            <input type="text" name="value" class="form-control"/>
            <input type="submit" value="Tambah" class="btn btn-primary"/>
        </form>
        `),
            input = CreateElement({
                tagname: 'li',
                classnames: 'list-group-item list-group-item-action',
                content: content
            });

        input.querySelector('form').addEventListener('submit', event => {
            event.preventDefault();
            if(this.DataIsObject){
                let label = input.querySelector('input[name="label"]').value;
                let value = input.querySelector('input[name="value"]').value;
                this._InsertCustomItem({label: label, value: value});
            } else {
                let value = input.querySelector('input[name="value"]').value;
                this._InsertCustomItem({value: value});
            }
            input.parentNode.removeChild(input);
            input = null;
        });

        this.addedList.insertBefore(input, this.CustomInput)
    }

    _InsertCustomItem({label, value}) {
        let item = CreateElement({
                tagname: 'li',
                classnames: 'list-group-item list-group-item-action',
                attributes: {
                    value: value,
                    isCustom: true
                },
                content: `
                <div class="row">
                    <div class="col">${(label ? label : value)}</div>
                    <div class="col-auto">
                        <button class="btn btn-danger">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                </div>`
            }),
            list = this.data.added,
            data;
        if (this.DataIsObject){
            data = {
                value: value,
                label: label ? label : value
            };
        } else {
            data = value;
        }
        list.push(data);
        item.querySelector('button').addEventListener('click', event => this._MoveItem(event));

        this.addedList.insertBefore(item, this.CustomInput);

        if(this.targetIsInput){
            this.target.value = JSON.stringify(this.data.added)
        }
    }

    _MoveItem(event) {
        let target = event.currentTarget;
        while(target.nodeName != 'UL'){
            target = target.parentNode;
        }
        if(target == this.addedList) {
            this._RemoveItem(event);
        } else if(target == this.availableList){
            this._AddItem(event);
        }
        if(this.targetIsInput){
            this.target.value = JSON.stringify(this.data.added)
        }
    }

    _PopulateList(list, data = []) {
        let error = false, errorMessage = '';
        data.forEach(item => {
            if(!error){
                let ItemData = {label: '', value: ''}

                if (typeof item === 'object'){
                    if(Object.hasOwnProperty.call(item), 'label') {
                        ItemData.label = item.label;
                    }

                    if(Object.hasOwnProperty.call(item, 'value')) {
                        this.DataIsObject = true;
                        ItemData.value = item.value;
                        if(ItemData.label == '') ItemData.label = item.value;
                    } else {
                        error = true;
                        errorMessage = "Incorrect data format";
                    }
                } else {
                    ItemData.label = ItemData.value = item;
                }
                if(!error) {
                    let button = (list == this.availableList ? {icon: 'plus', class: 'primary'} : {icon: 'minus', class: 'danger'});
                    const ListItem = CreateElement({
                            tagname: 'li',
                            classnames: 'list-group-item list-group-item-action',
                            attributes: {
                                value: ItemData.value
                            },
                            content: `
                            <div class="row">
                                <div class="col">${ItemData.label}</div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-${button.class}">
                                        <i class="fas fa-${button.icon}"></i>
                                    </button>
                                </div>
                            </div>`
                        });
                    
                    ListItem.querySelector('button').addEventListener('click', event => this._MoveItem(event));

                    list.append(ListItem);
                }
            }
        });

        if(error) {
            console.error(errorMessage);
            list.append(errorMessage);
            return;
        }

        if(list == this.addedList){
            const NewCustomItem = this.CustomInput = CreateElement({
                name: 'li',
                classnames: 'list-group-item list-group-item-action',
                attributes: {
                    value: 'create-new'
                },
                content: `
                <div class="row">
                    <div class="col-auto">
                        <i class="fas fa-plus"></i>
                    </div>
                    <div class="col">Buat Baru</div>
                </div>
                `
            });
            NewCustomItem.addEventListener('click', event => this._CreateCustomItem());
            list.append(NewCustomItem);
        }
    }

    _RemoveItem(event) {
        let value       = event.currentTarget.parentNode.parentNode.parentNode.getAttribute('value'),
            isCustom    = event.currentTarget.parentNode.parentNode.parentNode.hasAttribute('isCustom'),
            available = this.data.available,
            added   = this.data.added,
            data;

        if(typeof added[0] === 'object'){
            const values    = added.map(item => item.value),
                index       = values.indexOf(value);

            data = added[index];
            if(!isCustom) available.push(data);

            added.splice(index, 1);

            if(this.onRemove) this.onRemove(data);
        } else if(typeof added[0] === 'string') {
            added.splice(added.indexOf(value), 1);
            if(!isCustom) available.push(value);

            if(this.onRemove) this.onRemove(value);
        }

        let element = this.addedList.querySelector(`[value="${value}"]`),
            button  = element.querySelector('button'),
            icon    = button.querySelector('i');
        if(!isCustom){
            this.availableList.append(element);
            button.classList.remove('btn-danger');
            icon.classList.remove('fa-minus');
            button.classList.add('btn-primary');
            icon.classList.add('fa-plus');
        } else {
            this.addedList.removeChild(element);
        }

        if(this.removeURL) {
            let data = new FormData;
            data.append('value', value);
            DataSend({
                url         : this.removeURL,
                onsuccess   : data  => console.log(data),
                onfail      : error => console.error(error),
                options     : {
                    method  : 'POST',
                    headers : {
                        'X-Requested-With'  : 'XMLHttpRequest',
                        'X-CSRF-TOKEN'      : document.querySelector('meta[name="_token"]').getAttribute('content')
                    },
                    body    : data
                }
            });
        }
    }

    _RenderUI() {
        const mainContainer = CreateElement({ classnames: 'container' }),
            row = CreateElement({ classnames: 'row ' }),
            addedPanel = CreateElement({
                classnames: 'col-12 col-md-6 mb-5',
                attributes: {
                    style: 'height: 300px; overflow: auto'
                }
            }),
            availablePanel = CreateElement({
                classnames: 'col-12 col-md-6 mb-5',
                attributes: {
                    style: 'height: 300px; overflow: auto'
                }
            }),
            addedList = this.addedList = CreateElement({
                tagname: 'ul',
                classnames: 'list-group',
            }),
            availableList = this.availableList = CreateElement({
                tagname: 'ul',
                classnames: 'list-group',
            });

        this._PopulateList(addedList, this.data.added);
        this._PopulateList(availableList, this.data.available);

        if(this.data.available.length && this.targetIsInput) {
            this.target.value = JSON.stringify(this.data.added)
        }
        
        addedPanel.append(addedList);
        availablePanel.append(availableList);
        row.append(availablePanel);
        row.append(addedPanel);
        mainContainer.append(row);

        if(this.targetIsInput){
            this.target.type = 'hidden';
            this.target.parentNode.insertBefore(mainContainer, this.target);
        } else {
            this.target.append(mainContainer);
        }
    }

    get getData() {
        return {added: this.data.added, available: this.data.available};
    }
}

export default InstallableList;