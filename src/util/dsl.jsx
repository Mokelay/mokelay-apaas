import _ from 'lodash';

export default {
  //GET DSL
  getDSL: function () {
    return window.__Mokelay.VarCenter.get('CustomVar.ui_dsl');
  },

  //Set DSL
  setDSL: function (dsl) {
    window.__Mokelay.VarCenter.set('CustomVar.ui_dsl', dsl);
  },

  //Get View Path
  getViewPath: function (uuid) {
    var dsl = this.getDSL();

    var view = dsl['view'];

    var _findByUUID = function (view, uuid, path) {
      if (view['uuid'] != uuid) {
        var _path = null;
        var children = view['children'] || [];
        children.forEach(function (v, index) {
          var p = _findByUUID(v, uuid, path + '.children[' + index + ']');
          if (p) {
            _path = p;
          }
        });

        return _path;
      } else {
        return path;
      }
    };

    return _findByUUID(view, uuid, 'view');
  },

  //更新GridNumber
  updateGridNumber: function (uuid, gridNumber) {
    var dsl = this.getDSL();
    // dsl['view']['name'] = '哈哈';
    var path = this.getViewPath(uuid);
    // console.log(path);
    // console.log(gridNumber);
    _.set(dsl, path + '.styles.dimensions.xs', parseInt(gridNumber));
    // console.log(dsl);
    this.setDSL(dsl);
  },
};
