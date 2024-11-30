"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Concrete Product for Windows
var WindowsButton = /** @class */ (function () {
    function WindowsButton() {
    }
    WindowsButton.prototype.render = function () {
        console.log("Rendering a Windows-style button.");
    };
    return WindowsButton;
}());
// Concrete Product for Mac
var MacButton = /** @class */ (function () {
    function MacButton() {
    }
    MacButton.prototype.render = function () {
        console.log("Rendering a Mac-style button.");
    };
    return MacButton;
}());
// Creator (Abstract)
var Dialog = /** @class */ (function () {
    function Dialog() {
    }
    Dialog.prototype.render = function () {
        var button = this.createButton(); // Factory Method
        button.render();
    };
    return Dialog;
}());
// Concrete Creator for Windows
var WindowsDialog = /** @class */ (function (_super) {
    __extends(WindowsDialog, _super);
    function WindowsDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowsDialog.prototype.createButton = function () {
        return new WindowsButton();
    };
    return WindowsDialog;
}(Dialog));
// Concrete Creator for Mac
var MacDialog = /** @class */ (function (_super) {
    __extends(MacDialog, _super);
    function MacDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MacDialog.prototype.createButton = function () {
        return new MacButton();
    };
    return MacDialog;
}(Dialog));
// Factory method to decide the dialog type based on the platform
function getDialog(platform) {
    if (platform === "Windows") {
        return new WindowsDialog();
    }
    else if (platform === "Mac") {
        return new MacDialog();
    }
    else {
        throw new Error("Unsupported platform.");
    }
}
// Client code
function main() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter your platform (Windows/Mac): ", function (platform) {
        try {
            var dialog = getDialog(platform.trim());
            dialog.render();
        }
        catch (error) {
            console.error(error.message);
        }
        finally {
            rl.close();
        }
    });
}
main();
