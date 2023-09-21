import EventEmitter from 'EventEmitter';

/**
 * 监听JSON, 用于json对象的监听、事件触发
 * const jw = new JSONWatch({a: {b : 1}})
 * jw.on("a.b", console.log) // ["a.b", 2]
 * jw.on("$updated", console.log) // {path:"a.b", value: 2}
 * jw.set("a.b", 2)
 * jw.get("a.b") // 2
 */

export default class JSONWatch extends EventEmitter {
  constructor(data) {
    super();
    this.data = data || {};
  }
  on(a, b) {
    if (a.indexOf(',') > -1) {
      a.split(',').forEach((i) => {
        super.on(i, b);
      });
    } else {
      super.on(a, b);
    }
  }

  off(a, b) {
    if (a.indexOf(',') > -1) {
      a.split(',').forEach((i) => {
        super.off(i, b);
      });
    } else {
      super.off(a, b);
    }
  }
  get(path) {
    return this.getVariable(path);
  }

  getVariable(path) {
    if (typeof path !== 'string') {
      // eslint-disable-next-line no-console
      console.warn('Not string:', path);
      return '';
    }
    // $RET.$ALL;
    // 获取当前对象的特殊语法
    if (path === '$ALL') {
      return this.data;
    }

    if (path.indexOf('.') > -1) {
      path = path.split('.');

      let ret = this.data;
      for (let i = 0; i < path.length; i++) {
        ret = ret[path[i]];
        if (ret === undefined || ret === null) {
          return;
        }
      }
      return ret;
    }

    return this.data[path];
  }
  set(path, value) {
    if (path.indexOf('.') > -1) {
      const paths = path.split('.');
      let ret = this.data;
      for (let i = 0; i < paths.length - 1; i++) {
        // 兼容多层级不存在的时候，自动构建层级
        if (ret[paths[i]] === undefined) {
          ret = ret[paths[i]] = {};
        } else {
          ret = ret[paths[i]];
        }
      }
      ret[paths[paths.length - 1]] = value;
    } else {
      this.data[path] = value;
    }

    this.emit(path, value);
    // 如果设置父级，那么触发所有子集的变更
    if (value && Object.keys(value).length) {
      Object.keys(value).forEach((key) => {
        this.emit(`${path}.${key}`, value[key]);
      });
    }

    this.emit('$updated', [path, value]);
  }
}
