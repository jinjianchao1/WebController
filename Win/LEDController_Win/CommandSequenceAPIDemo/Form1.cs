using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Threading;

namespace CommandSequenceAPIDemo
{
    public partial class Form1 : Form
    {
        IDictionary<int, List<int>> cmdCache = new Dictionary<int, List<int>>();
        public const int LEVEL_1 = 1;
        public const int LEVEL_2 = 2;
        public const int LEVEL_3 = 3;
        Thread threadGetCmdList = null;
        Thread threadRunCmd = null;
        bool isRun = false;

        string url = "http://localhost/ledcontroller/API/CommandAPI.php";
        string postData = "{\"func\":\"loadAllCommands\",\"data\":{\"status\":1}}";

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Form.CheckForIllegalCrossThreadCalls = false;
            this.Hide();
            cmdCache.Add(LEVEL_1, new List<int>());
            cmdCache.Add(LEVEL_2, new List<int>());
            cmdCache.Add(LEVEL_3, new List<int>());
            menuStart_Click(sender, e);
        }

        private void button4_Click(object sender, EventArgs e)
        {
            isRun = true;
            threadGetCmdList = new Thread(new ThreadStart(CreateCmdList));
            threadGetCmdList.Start();
            threadRunCmd = new Thread(new ThreadStart(StartExecxuteCmd));
            threadRunCmd.Start();
        }

        bool IsContainsCmd(int id,int level)
        {
            List<int> list = cmdCache[level];
            if (list.Contains(id)) return true;
            return false ;
        }

        void CreateCmdList()
        {
            while (isRun)
            {
                WebRequest wRequest = WebRequest.Create(url);
                wRequest.Method = "POST";
                wRequest.ContentType = "application/json";
                using (StreamWriter writer = new StreamWriter(wRequest.GetRequestStream()))
                {
                    writer.Write(postData);
                }
                WebResponse wResponse = wRequest.GetResponse();
                Stream stream = wResponse.GetResponseStream();
                StreamReader reader = new StreamReader(stream, System.Text.Encoding.Default);
                string r = reader.ReadToEnd();   //url返回的值  
                //richTextBox1.AppendText(r + "\r\n");
                wResponse.Close();

                JObject jo = (JObject)JsonConvert.DeserializeObject(r);
                int count = jo["data"]["count"].ToObject<int>();

                for (int i = 0; i < count; i++)
                {
                    //jo["data"]["data"][i]["ID"]命令ID
                    //jo["data"]["data"][i]["Key"]命令关键字
                    //jo["data"]["data"][i]["Level"]命令级别
                    //jo["data"]["data"][i]["Tag"] 1-客户端命令 2-PLC命令
                    JToken token = jo["data"]["data"][i];
                    int id = token["ID"].ToObject<int>();
                    string key = token["Key"].ToObject<string>();
                    int level = token["Level"].ToObject<int>();

                    List<int> list = cmdCache[level];
                    if (!IsContainsCmd(id, level))
                    {
                        list.Add(id);
                    }

                    //RunCmd(id);
                    Thread.Sleep(500);
                }
                Thread.Sleep(500);
            }
        }

        void StartExecxuteCmd()
        {
            while (isRun)
            {
                List<int> level1List = cmdCache[LEVEL_1];
                List<int> level2List = cmdCache[LEVEL_2];
                List<int> level3List = cmdCache[LEVEL_3];
                if (level1List.Count > 0)
                {
                    int id = level1List[0];
                    level1List.RemoveAt(0);
                    RunCmd(id.ToString());
                }
                else if (level2List.Count > 0)
                {
                    int id = level2List[0];
                    level2List.RemoveAt(0);
                    RunCmd(id.ToString());
                }
                else if (level3List.Count > 0)
                {
                    int id = level3List[0];
                    level3List.RemoveAt(0);
                    RunCmd(id.ToString());
                }
            }
        }

        void RunCmd(string cmdID)
        {
            //string url = "http://localhost/ledcontroller/API/CommandAPI.php";
            string postData = "{\"func\":\"execute\",\"ID\":" + cmdID + "}";
            WebRequest wRequest = WebRequest.Create(url);
            wRequest.Method = "POST";
            wRequest.ContentType = "application/json";
            using (StreamWriter writer = new StreamWriter(wRequest.GetRequestStream()))
            {
                writer.Write(postData);
            }
            WebResponse wResponse = wRequest.GetResponse();
            Stream stream = wResponse.GetResponseStream();
            StreamReader reader = new StreamReader(stream, System.Text.Encoding.Default);
            string r = reader.ReadToEnd();   //url返回的值  
            richTextBox1.AppendText(r + "\r\n");
            wResponse.Close();
        }


        private void button5_Click_1(object sender, EventArgs e)
        {
            isRun = false;
        }

        private void menuStart_Click(object sender, EventArgs e)
        {
            button4_Click(sender, e);
            menuStart.Enabled = false;
            menuStop.Enabled = true;
            menuExit.Enabled = false;
        }

        private void menuStop_Click(object sender, EventArgs e)
        {
            isRun = false;
            menuStart.Enabled = true;
            menuStop.Enabled = false;
            menuExit.Enabled = true;
        }

        private void menuExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}


