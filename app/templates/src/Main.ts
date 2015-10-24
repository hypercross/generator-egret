import LoadingUI from './LoadingUI'
import {loadGroup, loadConfig, once, getResAsync} from './Preload';
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();

		var me:Main = this;
		var loadingView:LoadingUI;

		once(this, egret.Event.ADDED_TO_STAGE)
			.then(event =>{
				console.log("added to stage...");
				loadingView = new LoadingUI();
				me.stage.addChild(loadingView);

				return loadConfig("../egret/resource/default.res.json", "../egret/resource/");
			}).then(event =>{
				console.log("loaded config...");
				return loadGroup("preload");
			}).then(event =>{
				console.log("loaded group...");
				me.stage.removeChild(loadingView);
				me.createGameScene();
			});
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var sky:egret.Bitmap = this.createBitmapByName("bgImage");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var topMask:egret.Shape = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, stageH);
        topMask.graphics.endFill();
        topMask.width = stageW;
        topMask.height = stageH;
        this.addChild(topMask);

        var icon:egret.Bitmap = this.createBitmapByName("egretIcon");
        this.addChild(icon);
        icon.scaleX = 0.55;
        icon.scaleY = 0.55;
        icon.anchorOffsetX = icon.width / 2;
        icon.anchorOffsetY = icon.height / 2;
        icon.x = stageW / 2;
        icon.y = stageH / 2 - 60;

        var colorLabel:egret.TextField = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 20;
        colorLabel.x = stageW - colorLabel.width >> 1;
        colorLabel.y = (stageH - colorLabel.height >> 1) + 50;
        this.addChild(colorLabel);

        var textfield:egret.TextField = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.x = 0;
        textfield.y = stageH / 2 + 100;
        this.textfield = textfield;

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description", this.startAnimation, this)
		var me:Main = this;
		getResAsync("description").then(data =>{
			me.startAnimation(data);
		});

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser:egret.HtmlTextParser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield:egret.TextField = self.textfield;
        var count:number = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}
egret.registerClass(Main, "Main");
window["Main"] = Main
