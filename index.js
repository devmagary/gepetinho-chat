import 'react-native-get-random-values';

// Polyfill manual para URLSearchParams.set (Hermes não suporta nativamente)
if (typeof URLSearchParams !== 'undefined' && !URLSearchParams.prototype.set) {
    URLSearchParams.prototype.set = function(name, value) {
        // Remove todas as ocorrências existentes
        const entries = [];
        this.forEach((v, k) => {
            if (k !== name) {
                entries.push([k, v]);
            }
        });
        // Adiciona o novo valor
        entries.push([name, String(value)]);
        // Limpa e reconstrói
        // Workaround: deletar todos e adicionar novamente
        const keysToDelete = [];
        this.forEach((v, k) => keysToDelete.push(k));
        keysToDelete.forEach(k => this.delete(k));
        entries.forEach(([k, v]) => this.append(k, v));
    };
    console.log('URLSearchParams.set polyfill aplicado manualmente.');
}

// Polyfill para URLSearchParams.get se não existir
if (typeof URLSearchParams !== 'undefined' && !URLSearchParams.prototype.get) {
    URLSearchParams.prototype.get = function(name) {
        let result = null;
        this.forEach((v, k) => {
            if (k === name && result === null) {
                result = v;
            }
        });
        return result;
    };
    console.log('URLSearchParams.get polyfill aplicado manualmente.');
}

import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('chatgepetinho', () => App);
