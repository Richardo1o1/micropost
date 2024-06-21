import Header from "@/components/Page/Header";
import NotificationFeed from "@/components/posts/NotificationFeed";


const Notification = () => {
  return (
    <div className="h-screen">
      <Header label="Notifications" showBackArrow />
      <NotificationFeed  />
    </div>
  )
}

export default Notification;