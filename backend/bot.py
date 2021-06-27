import os
parent_dir, current_filename = os.path.split(os.path.realpath(__file__))

from time import sleep
import pickle
from selenium.webdriver import Chrome
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains


class ZoomBot:

    def __init__(self):

        self.meeting_id = None
        self.driver = Chrome(executable_path=parent_dir + "/chromedriver")

        # Other initial setup
        self.driver.get("https://zoom.us/")
        if os.path.exists("cookies.pkl"): 
            cookies = pickle.load(open("cookies.pkl", "rb"))
            for cookie in cookies:
                self.driver.add_cookie(cookie)

        self.driver.maximize_window()
        self.driver.get("https://zoom.us/profile")
        

    def update_cookies(self):
        required_cookies = ['_zm_ssid', '_zm_page_auth', '_zm_kms']
        
        cookies =[cookie for cookie in self.driver.get_cookies() if cookie["name"] in required_cookies]

        pickle.dump(cookies, open("cookies.pkl","wb"))


    def add_bot_to_meeting(self, meeting_id, meeting_password):

        self.meeting_id = meeting_id

        # Enter meeting and fill password if one is required
        self.driver.get(f"https://zoom.us/wc/join/{meeting_id}")

        # Enter bot's name and join
        self.driver.find_element_by_xpath("//input[@name='inputname']").send_keys("Class Bot")
        self.driver.find_element_by_xpath("//button[@id='joinBtn']").click()

        chat_opened = False
        while not chat_opened:
            try:
                self.driver.find_element_by_xpath("//button[@aria-label='open the chat pane']").click()
                chat_opened = True
            except:
                pass
            

    def fetch_latest_message(self):

        chat_elements = self.driver.find_elements_by_css_selector(
            ".chat-message__text-box.chat-message__text-content.chat-message__text-box--others")
        latest_message = chat_elements[-1].text

        user_elements = self.driver.find_elements_by_xpath("//span[@class='chat-item__sender chat-item__chat-info-header--can-select']")
        latest_user = user_elements[-1].text

        print(f"{latest_user}: {latest_message}")

        return [latest_user, latest_message]


    def send_message(self, user, message):
        try:
            to_button = self.driver.find_element_by_xpath("//button[@id='chatReceiverMenu']")
            to_button.click()

            # Switch to message privately window
            a = self.driver.find_element_by_xpath(f"//a[contains(text(), '{user}')]")
            a.click()

            # Now send the message
            for m in message.split('\n'): # Deal with messages that have multiple lines
                self.driver.find_element_by_xpath("//textarea[@title='chat message']").send_keys(m)
                ActionChains(self.driver).key_down(Keys.SHIFT).key_down(Keys.ENTER).key_up(Keys.SHIFT).key_up(Keys.ENTER).perform()
            
            self.driver.find_element_by_xpath("//textarea[@title='chat message']").send_keys(Keys.ENTER)
        except:
            print("There was an error in sending message")

    def quit(self):
        self.driver.quit()

if __name__ == "__main__":
    bot = ZoomBot()
