function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var fabric = require('fabric');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var STROKE = '#000000';
var FILL = 'rgba(255, 255, 255, 0.0)';
var CIRCLE = {
  radius: 20,
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE
};
var RECTANGLE = {
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE,
  width: 40,
  height: 40,
  angle: 0
};
var LINE = {
  points: [50, 100, 200, 200],
  options: {
    left: 170,
    top: 150,
    stroke: STROKE
  }
};
var TEXT = {
  type: 'text',
  left: 100,
  top: 100,
  fontSize: 16,
  fontFamily: 'Arial',
  fill: STROKE
};

var buildEditor = function buildEditor(canvas, fillColor, strokeColor, _setFillColor, _setStrokeColor, scaleStep) {
  return {
    canvas: canvas,
    addCircle: function addCircle() {
      var object = new fabric.fabric.Circle(_extends({}, CIRCLE, {
        fill: fillColor,
        stroke: strokeColor
      }));
      canvas.add(object);
    },
    addRectangle: function addRectangle() {
      var object = new fabric.fabric.Rect(_extends({}, RECTANGLE, {
        fill: fillColor,
        stroke: strokeColor
      }));
      canvas.add(object);
    },
    addLine: function addLine() {
      var object = new fabric.fabric.Line(LINE.points, _extends({}, LINE.options, {
        stroke: strokeColor
      }));
      canvas.add(object);
    },
    addText: function addText(text) {
      var object = new fabric.fabric.Textbox(text, _extends({}, TEXT, {
        fill: strokeColor
      }));
      object.set({
        text: text
      });
      canvas.add(object);
    },
    updateText: function updateText(text) {
      var objects = canvas.getActiveObjects();

      if (objects.length && objects[0].type === TEXT.type) {
        var textObject = objects[0];
        textObject.set({
          text: text
        });
        canvas.renderAll();
      }
    },
    deleteAll: function deleteAll() {
      canvas.getObjects().forEach(function (object) {
        return canvas.remove(object);
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    deleteSelected: function deleteSelected() {
      canvas.getActiveObjects().forEach(function (object) {
        return canvas.remove(object);
      });
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    fillColor: fillColor,
    strokeColor: strokeColor,
    setFillColor: function setFillColor(fill) {
      _setFillColor(fill);

      canvas.getActiveObjects().forEach(function (object) {
        return object.set({
          fill: fill
        });
      });
      canvas.renderAll();
    },
    setStrokeColor: function setStrokeColor(stroke) {
      _setStrokeColor(stroke);

      canvas.getActiveObjects().forEach(function (object) {
        if (object.type === TEXT.type) {
          object.set({
            fill: stroke
          });
          return;
        }

        object.set({
          stroke: stroke
        });
      });
      canvas.renderAll();
    },
    zoomIn: function zoomIn() {
      var zoom = canvas.getZoom();
      canvas.setZoom(zoom / scaleStep);
    },
    zoomOut: function zoomOut() {
      var zoom = canvas.getZoom();
      canvas.setZoom(zoom * scaleStep);
    }
  };
};

var useFabricJSEditor = function useFabricJSEditor(props) {
  if (props === void 0) {
    props = {};
  }

  var scaleStep = props.scaleStep || 0.5;
  var _props = props,
      defaultFillColor = _props.defaultFillColor,
      defaultStrokeColor = _props.defaultStrokeColor;

  var _useState = React.useState(null),
      canvas = _useState[0],
      setCanvas = _useState[1];

  var _useState2 = React.useState(defaultFillColor || FILL),
      fillColor = _useState2[0],
      setFillColor = _useState2[1];

  var _useState3 = React.useState(defaultStrokeColor || STROKE),
      strokeColor = _useState3[0],
      setStrokeColor = _useState3[1];

  var _useState4 = React.useState([]),
      selectedObjects = _useState4[0],
      setSelectedObject = _useState4[1];

  React.useEffect(function () {
    var bindEvents = function bindEvents(canvas) {
      canvas.on('selection:cleared', function () {
        setSelectedObject([]);
      });
      canvas.on('selection:created', function (e) {
        setSelectedObject(e.selected);
      });
      canvas.on('selection:updated', function (e) {
        setSelectedObject(e.selected);
      });
    };

    if (canvas) {
      bindEvents(canvas);
    }
  }, [canvas]);
  return {
    selectedObjects: selectedObjects,
    onReady: function onReady(canvasReady) {
      console.log('Fabric canvas ready');
      setCanvas(canvasReady);
    },
    editor: canvas ? buildEditor(canvas, fillColor, strokeColor, setFillColor, setStrokeColor, scaleStep) : undefined
  };
};

var FabricJSCanvas = function FabricJSCanvas(_ref) {
  var className = _ref.className,
      onReady = _ref.onReady;
  var canvasEl = React.useRef(null);
  var canvasElParent = React.useRef(null);
  React.useEffect(function () {
    var canvas = new fabric.fabric.Canvas(canvasEl.current);

    var setCurrentDimensions = function setCurrentDimensions() {
      var _canvasElParent$curre, _canvasElParent$curre2;

      canvas.setHeight(((_canvasElParent$curre = canvasElParent.current) === null || _canvasElParent$curre === void 0 ? void 0 : _canvasElParent$curre.clientHeight) || 0);
      canvas.setWidth(((_canvasElParent$curre2 = canvasElParent.current) === null || _canvasElParent$curre2 === void 0 ? void 0 : _canvasElParent$curre2.clientWidth) || 0);
      canvas.renderAll();
    };

    var resizeCanvas = function resizeCanvas() {
      setCurrentDimensions();
    };

    setCurrentDimensions();
    window.addEventListener('resize', resizeCanvas, false);

    if (onReady) {
      onReady(canvas);
    }

    return function () {
      canvas.dispose();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return React__default.createElement("div", {
    ref: canvasElParent,
    className: className
  }, React__default.createElement("canvas", {
    ref: canvasEl
  }));
};

exports.FabricJSCanvas = FabricJSCanvas;
exports.useFabricJSEditor = useFabricJSEditor;
//# sourceMappingURL=index.js.map
