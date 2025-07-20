import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";

interface Course {
  title: string;
  instructor: string;
  duration: string;
  students: string;
  level: string;
  rating: number;
}

interface CourseInfoProps {
  course: Course;
}

const CourseInfo = ({ course }: CourseInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>
        <Badge className="w-fit">{course.level}</Badge>
      </CardHeader>
    </Card>
  );
};

export default CourseInfo;