import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric"; // Note the change in import syntax
import { ChromePicker } from "react-color";
import { saveAs } from "file-saver";
import {
  FaPencilAlt,
  FaEraser,
  FaSquare,
  FaCircle,
  FaFont,
  FaSave,
  FaTrash,
} from "react-icons/fa";

const Whiteboard = ({ socket, roomId }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [brushSize, setBrushSize] = useState(5);

  // Initialize the canvas
  useEffect(() => {
    // Make sure we have both the DOM ref and socket before creating canvas
    if (!canvasRef.current) return;

    // Create canvas with initial dimensions
    const canvasWidth = window.innerWidth * 0.65;
    const canvasHeight = window.innerHeight * 0.6;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "white",
    });

    // Initialize the brush
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = brushSize;

    fabricCanvasRef.current = canvas;

    // Resize handler
    const handleResize = () => {
      if (fabricCanvasRef.current) {
        const canvas = fabricCanvasRef.current;
        canvas.setWidth(window.innerWidth * 0.65);
        canvas.setHeight(window.innerHeight * 0.6);
        canvas.renderAll();
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Socket event handlers
  useEffect(() => {
    if (!fabricCanvasRef.current || !socket) return;

    const canvas = fabricCanvasRef.current;

    // Handle receiving drawing data
    const handleReceiveDrawing = (data) => {
      if (canvas) {
        canvas.loadFromJSON(data, canvas.renderAll.bind(canvas));
      }
    };

    socket.on("receive-drawing", handleReceiveDrawing);

    // Emit changes to other users
    const handlePathCreated = () => {
      if (canvas && socket) {
        const data = canvas.toJSON();
        socket.emit("draw", { drawLine: data, roomId });
      }
    };

    canvas.on("path:created", handlePathCreated);
    canvas.on("object:modified", handlePathCreated);

    return () => {
      socket.off("receive-drawing", handleReceiveDrawing);
      if (canvas) {
        canvas.off("path:created", handlePathCreated);
        canvas.off("object:modified", handlePathCreated);
      }
    };
  }, [socket, roomId]);

  // Update brush properties when color or size changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    if (canvas.freeDrawingBrush) {
      if (tool === "eraser") {
        canvas.freeDrawingBrush.color = "#ffffff";
        canvas.freeDrawingBrush.width = brushSize * 2;
      } else {
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = brushSize;
      }
    }
  }, [color, brushSize, tool]);

  const handleToolChange = (selectedTool) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    setTool(selectedTool);

    switch (selectedTool) {
      case "pencil":
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = brushSize;
        break;
      case "eraser":
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = "#ffffff";
        canvas.freeDrawingBrush.width = brushSize * 2;
        break;
      case "rectangle":
      case "circle":
        canvas.isDrawingMode = false;
        break;
      default:
        break;
    }
  };

  const addShape = (shape) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    let fabricShape;

    if (shape === "rectangle") {
      fabricShape = new fabric.Rect({
        left: canvas.width / 2 - 50,
        top: canvas.height / 2 - 50,
        fill: color,
        width: 100,
        height: 100,
      });
    } else if (shape === "circle") {
      fabricShape = new fabric.Circle({
        left: canvas.width / 2 - 50,
        top: canvas.height / 2 - 50,
        fill: color,
        radius: 50,
      });
    }

    if (fabricShape) {
      canvas.add(fabricShape);
      canvas.setActiveObject(fabricShape);
      canvas.renderAll();

      if (socket) {
        socket.emit("draw", { drawLine: canvas.toJSON(), roomId });
      }
    }
  };

  const addText = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const text = new fabric.IText("Type here", {
      left: canvas.width / 2 - 50,
      top: canvas.height / 2 - 20,
      fill: color,
      fontSize: brushSize * 4,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();

    if (socket) {
      socket.emit("draw", { drawLine: canvas.toJSON(), roomId });
    }
  };

  const clearCanvas = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    canvas.clear();
    canvas.setBackgroundColor("white", canvas.renderAll.bind(canvas));

    if (socket) {
      socket.emit("draw", { drawLine: canvas.toJSON(), roomId });
    }
  };

  const saveCanvas = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const dataUrl = canvas.toDataURL({ format: "png" });
    saveAs(
      dataUrl,
      `whiteboard-${roomId}-${new Date().toISOString().slice(0, 10)}.png`
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => handleToolChange("pencil")}
            className={`p-2 rounded transition-colors ${
              tool === "pencil"
                ? "bg-yellow-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Pencil"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => handleToolChange("eraser")}
            className={`p-2 rounded transition-colors ${
              tool === "eraser"
                ? "bg-yellow-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            title="Eraser"
          >
            <FaEraser />
          </button>
          <button
            onClick={() => {
              setTool("rectangle");
              addShape("rectangle");
            }}
            className={`p-2 rounded transition-colors bg-white hover:bg-gray-100`}
            title="Add Rectangle"
          >
            <FaSquare />
          </button>
          <button
            onClick={() => {
              setTool("circle");
              addShape("circle");
            }}
            className={`p-2 rounded transition-colors bg-white hover:bg-gray-100`}
            title="Add Circle"
          >
            <FaCircle />
          </button>
          <button
            onClick={() => {
              setTool("text");
              addText();
            }}
            className={`p-2 rounded transition-colors bg-white hover:bg-gray-100`}
            title="Add Text"
          >
            <FaFont />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-8 h-8 rounded border border-gray-300"
              style={{ backgroundColor: color }}
              title="Color Picker"
            />
            {showColorPicker && (
              <div className="absolute z-10 mt-2">
                <div
                  className="fixed inset-0"
                  onClick={() => setShowColorPicker(false)}
                />
                <ChromePicker
                  color={color}
                  onChange={(c) => setColor(c.hex)}
                  disableAlpha={true}
                />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Size:</span>
            <input
              type="range"
              min="1"
              max="30"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-24"
              title={`Brush Size: ${brushSize}`}
            />
            <span className="text-xs w-6">{brushSize}</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={saveCanvas}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            title="Save Whiteboard"
          >
            <FaSave />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="Clear Whiteboard"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex justify-center items-center bg-gray-100 p-4">
        <div className="border border-gray-300 shadow-lg">
          <canvas ref={canvasRef} id="whiteboard-canvas" />
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;