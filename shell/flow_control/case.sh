# 流程控制语句
case 变量 in
	pattern1 )
		command1;
		command2;
		...
		commandN;
		;;
	pattern2 )
		command1;
		command2;
		...
		commandN;
		;;
	* )
		commandDef;
		;;
esac

# esac
# case的语法和C family语言差别很大，它需要一个esac（就是case反过来）作为结束标记，
# 每个case分支用右圆括号，用两个分号表示break。